import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import HeatConstants from '../constants/heat_constants'
import HeatsinkStore from '../stores/heatsink_store'
import GhostHeatGroupStore from '../stores/ghost_heat_group_store'
import HeatActions from '../actions/heat_actions'
import CooldownActions from '../actions/cooldown_actions'
import MapStore from './map_store'
import MapConstants from "../constants/map_constants"

/**
 * Store data
 *   {float} value               - the amount of heat in the mech
 *   {float} capacity            - mech heat capacity
 */
var data = {
  value: 0,
  capacity: 0,
}

/**
 * Increase mech heat by given amount
 *   {float} amount
 */
var add_base_heat = function(amount) {
  data.value = data.value + amount
}

/**
 * Reduce the heat by
 */
var release_heat = function(amount){
  data.value = +((data.value - amount).toFixed(2))
  setTimeout(CooldownActions.update_cooldown_time)

  if(data.value < 0){
    data.value = 0
  }
}


// TODO : Move this computation logic to heat store and just return do `this.setState(HeatStore.get_new_data())
var recalculate_capacity = function() {
  var heatsink_store_data = HeatsinkStore.get_new_data()
  // All mechs require a minimum 10 heat sinks to function
  // Engines come with 1 HS built in for every 25 rating up to the 250 engines
  // Standard or XL engine has no impact on this
  // All rates of Dissipation are given per second
  // Single Heat Sink [SHS] are worth 0.10 Dissipation each
  // [SHS] are worth 1.00 extra Heat Capacity each
  // Double Heat Sinks [DHS] are worth 0.14 to 0.20 dissipation each
  // [DHS] are worth 1.40 to 2.00 extra heat capacity
  // Internal [DHS] are worth 0.20 dissipation and 2.00 capacity
  // Internal [HS] are the ones built into the Engine
  // Visible [DHS] are worth 0.14 dissipation and 1.40 capacity
  // Any [DHS] manually added to the engine count as Visible

  var base_capacity = 30

  var internal_heatsink_capacity_modifier = 0
  var external_heatsink_capacity_modifier = 0

  if(heatsink_store_data.double_heatsinks) {
    internal_heatsink_capacity_modifier = 2
    external_heatsink_capacity_modifier = 1.4
  } else {
    internal_heatsink_capacity_modifier = 1
    external_heatsink_capacity_modifier = 1
  }

  var internal_capacity = heatsink_store_data.internal_heatsinks * internal_heatsink_capacity_modifier
  var external_capacity = heatsink_store_data.external_heatsinks * external_heatsink_capacity_modifier

  var capacity = +((base_capacity + internal_capacity + external_capacity))

  // Map-specific modifier
  var mapstore_data = MapStore.get_new_data()
  console.log('kekeke')
  if(typeof(mapstore_data.selected_map) != 'undefined') {
    console.log("map changed")
    capacity = capacity * mapstore_data.capacity
  }

  data.capacity = capacity
}

/* Broadcast string that notifies 'listeners' that the HeatStore's data has changed */
var CHANGE = HeatConstants.HEATSTORE_UPDATED

class HeatStore extends EventEmitter {

  /**
   * Return contents of stored data
   * TODO: Move to a store base class
   */
  get_new_data() {
    return data
  }

  /**
   * Broadcast that the store has changed
   * TODO: Move to a store base class
   */
  emitChange() {
    this.emit(CHANGE);
  }

  /**
   * TODO: Move to a store base class
   */
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  /**
   * TODO: Move to a store base class
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}

let _HeatStore = new HeatStore();
export default _HeatStore

/*
 * Register actions
 */
_HeatStore.dispatch_token = AppDispatcher.register((payload) => {
  var action_type = payload.action_type
  switch(action_type) {
    case HeatConstants.HEAT_CAPACITY_UPDATE:
      recalculate_capacity()
      _HeatStore.emit(CHANGE)
      break
    case MapConstants.CHANGE_MAP:
      AppDispatcher.waitFor([MapStore.dispatch_token])
      recalculate_capacity()
      _HeatStore.emit(CHANGE)
      break
    case HeatConstants.HEAT_APPLY:
      add_base_heat(payload.weapon.heat)
      _HeatStore.emit(CHANGE)
      break
    case HeatConstants.HEAT_RELEASE:
      release_heat(payload.amount)
      _HeatStore.emit(CHANGE)
      break
    case HeatConstants.GHOST_HEAT_APPLY:
      add_base_heat(payload.amount)
      _HeatStore.emit(CHANGE)
      break
  }
})


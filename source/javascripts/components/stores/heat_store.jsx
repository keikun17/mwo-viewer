import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import HeatConstants from '../constants/heat_constants'
import HeatsinkStore from '../stores/heatsink_store'
import HeatActions from '../actions/heat_actions'

/**
 * Store data
 *   {float} value               - the amount of heat in the mech
 *   {float} capacity            - mech heat capacity
 *   {float} ghost_heat_previous - Ghost heat added by previous weapon fire
 *   {float} ghost_heat_total    - Total ghost heat added since last mech reset
 */
var data = {
  value: 0,
  capacity: '---',
  ghost_heat_previous: '--',
  ghost_heat_total: '--'
}

/**
 * Increase mech heat by given amount
 */
var add_heat = function(amount) {
  data.value = data.value + amount
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

  var capacity = (base_capacity + internal_capacity + external_capacity).toPrecision(2)

  data.capacity = capacity
}

/* Broadcast string that notifies 'listeners' that the HeatStore's data has changed */
var CHANGE = 'HEATSTORE_UPDATED'

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
 * Subscribe to other store's changes
 */
HeatsinkStore.addChangeListener(HeatActions.update_capacity)

/*
 * Register actions
 */
AppDispatcher.register((payload) => {
  var action_type = payload.action_type
  switch(action_type) {
    case HeatConstants.HEAT_CAPACITY_UPDATE:
      recalculate_capacity()
      _HeatStore.emit(CHANGE)
      break

    case HeatConstants.HEAT_APPLY:
      add_heat(payload.amount)
      _HeatStore.emit(CHANGE)
      break
  }
})

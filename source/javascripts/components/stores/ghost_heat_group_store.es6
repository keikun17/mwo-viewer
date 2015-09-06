import AppDispatcher from '../app_dispatcher'
import {EventEmitter} from 'events'
import HeatConstants from '../constants/heat_constants'
import WeaponConstants from '../constants/weapon_constants'
import HeatStore from '../stores/heat_store'
import HeatActions from '../actions/heat_actions'
import WeaponStore from '../stores/weapon_store'

/**
 * Store data format
 *   <group name>: <ghost heat properties>
 *     {key}    <group name>           - Abbreviated Ghost heat linked penalty group name (e.g. slas, mlas, llas)
 *     {object} <ghost heat properies> :
 *          {float} trigger_time            - time remaining before `current` counter is reset
 *                                            heat group without triggering ghost heat
 *        {integer} current                 - number of times a weapon has been fired within the `trigger_time`
 *         {object} timer=undefined         - The 'setInterval' object for the weapon group that reduces trigger_time by a unit per tick
 *          {float} multiplier              - Ghost heat multiplier for each weapon fired beyond the limit
 *
 *
 */
var data = {
  mlas:    {trigger_time: 0, current: 0, timer: undefined, multiplier: 1 },
  llas:    {trigger_time: 0, current: 0, timer: undefined, multiplier: 2.8 },
  ppc:     {trigger_time: 0, current: 0, timer: undefined, multiplier: 7.0 },
  erppc:   {trigger_time: 0, current: 0, timer: undefined, multiplier: 4.5 },
  lrm:     {trigger_time: 0, current: 0, timer: undefined, multiplier: 2.8 },
  ac2:     {trigger_time: 0, current: 0, timer: undefined, multiplier: 1 },
  ac20:    {trigger_time: 0, current: 0, timer: undefined, multiplier: 24 },
  srm:     {trigger_time: 0, current: 0, timer: undefined, multiplier: 1 },
  ssrm:    {trigger_time: 0, current: 0, timer: undefined, multiplier: 1 },
  clas:    {trigger_time: 0, current: 0, timer: undefined, multiplier: 1 },
  cuac5:   {trigger_time: 0, current: 0, timer: undefined, multiplier: 1},
  cac5:   {trigger_time: 0, current: 0, timer: undefined, multiplier: 1},
  cac10:   {trigger_time: 0, current: 0, timer: undefined, multiplier: 1},
  cac20:   {trigger_time: 0, current: 0, timer: undefined, multiplier: 1},
}

var CHANGE = 'GHOST_HEAT_GROUP_UPDATED'

var register = function(ghost_heat_group_id) {
  if(typeof(data[ghost_heat_group_id]) != 'undefined'){
    data[ghost_heat_group_id] = {trigger_time: 0, current: 0, timer: undefined}
  }
}


/**
 *
 */
var heat_scale = function(weapons_fired){
  if(weapons_fired < 2) {
    return 0
  }else if(weapons_fired >= 12){
    return 5
  }

  switch(weapons_fired) {

    case 2:
      return 0.08
    case 3:
      return 0.18
    case 4:
      return 0.30
    case 5:
      return 0.45
    case 6:
      return 0.60
    case 7:
      return 0.60
    case 8:
      return 0.80
    case 9:
      return 1.50
    case 10:
      return 2.00
    case 11:
      return 3.00
  }
}

/**
 * @param {object} weapon - Equipped Weapon object from the weapon store
 *
 * 1. Set trigger time for weapon group to '2',
 * 2. Start group trigger timer if not started yet,
 * 3. Increment weapon group counter by 1
 * 4. Compute for the ghost heat if present and apply
 */
var include_ghost_heat = function(weapon) {
  var ghost_heat_group =data[weapon.ghost_heat_group]
  var ghost_heat_group = ghost_heat_group

  // Set trigger time for the weapon group to '2'
  ghost_heat_group.trigger_time = .5

  // Start group trigger timer if not started yet
  if(ghost_heat_group.timer == undefined){

    ghost_heat_group.timer = setInterval(
      function(){

        if(ghost_heat_group.trigger_time > 0){
          ghost_heat_group.trigger_time = ghost_heat_group.trigger_time - .1
        }else{
          // TODO : move this to its own method `reset_group_ghost_heat`
          // kill the timer when cooldown is over
          clearInterval(ghost_heat_group.timer)
          // remove the reference left behind by clearInterval
          ghost_heat_group.current = 0
          //
          ghost_heat_group.timer = undefined
          _GhostHeatGroupStore.emit(CHANGE)
        }
      }, 100)
  }

  // Increment weapon group counter by 1
  ghost_heat_group.current = ghost_heat_group.current + 1

  if(ghost_heat_group.current > weapon.ghost_limit){

    var ghost_heat_amount = weapon.heat *  ghost_heat_group.multiplier * heat_scale(ghost_heat_group.current)
    var ghost_linked_fire_sequence_position = ghost_heat_group.current

    setTimeout(function(){
      HeatActions.add_ghost_heat(ghost_heat_amount)
      var message = "[" + ghost_linked_fire_sequence_position  + "] " + weapon.name + " caused " + ghost_heat_amount.toFixed(2) + " ghost heat."
      _GhostHeatGroupStore.emit('ghost_heat_applied', message)
    })
    // Apply ghost heat
  }
}



class GhostHeatGroupStore extends EventEmitter {

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


let _GhostHeatGroupStore = new GhostHeatGroupStore()
_GhostHeatGroupStore.setMaxListeners(0)


/*
 * Register actions
 */
_GhostHeatGroupStore.dispatch_token = AppDispatcher.register((payload) => {

  var action_type = payload.action_type
  switch(action_type) {

    case HeatConstants.HEAT_APPLY:
      AppDispatcher.waitFor([HeatStore.dispatch_token])
      if(payload.weapon.ghost_limit !== 0) {
        include_ghost_heat(payload.weapon)
        _GhostHeatGroupStore.emit(CHANGE)
      }
      break

    case WeaponConstants.WEAPON_EQUIP:
      AppDispatcher.waitFor([WeaponStore.dispatch_token])
      register(payload.weapon_props.ghost_heat_group)
      break

  }
})

export default _GhostHeatGroupStore

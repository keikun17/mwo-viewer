import AppDispatcher from '../app_dispatcher'
import {EventEmitter} from 'events'
import HeatConstants from '../constants/heat_constants'
import HeatStore from '../stores/heat_store'
import HeatActions from '../actions/heat_actions'

/**
 * Store data format
 *   <group name>: <ghost heat properties>
 *     {key}    <group name>           - Abbreviated Ghost heat group name (e.g. slas, mlas, llas)
 *     {object} <ghost heat properies> :
 *        {float}   trigger_time            - time remaining before `current` counter is reset
 *        {integer} limit                   - number of shots that can be fired within the ghost
 *                                            heat group without triggering ghost heat
 *        {integer} current                 - number of times a weapon has been fired within the `trigger_time`
 *        {object}  timer=undefined         - The 'setInterval' object for the weapon group that reduces trigger_time by a unit per tick
 *
 */
var data = {
  mlas:   {trigger_time: 0, limit: 6, current: 0, timer: undefined, multiplier: 1 },
  llas:   {trigger_time: 0, limit: 2, current: 0, timer: undefined, multiplier: 2.8 },
  ppc:    {trigger_time: 0, limit: 2, current: 0, timer: undefined, multiplier: 7.0 },
  erppc:  {trigger_time: 0, limit: 2, current: 0, timer: undefined, multiplier: 4.5 },
  lrm20:  {trigger_time: 0, limit: 2, current: 0, timer: undefined, multiplier: 2.8 },
  lrm15:  {trigger_time: 0, limit: 2, current: 0, timer: undefined, multiplier: 2.8 },
  lrm10:  {trigger_time: 0, limit: 2, current: 0, timer: undefined, multiplier: 2.8 },
  ac2:    {trigger_time: 0, limit: 3, current: 0, timer: undefined, multiplier: 1 },
  ac20:   {trigger_time: 0, limit: 3, current: 0, timer: undefined, multiplier: 24 },
  srm2:   {trigger_time: 0, limit: 4, current: 0, timer: undefined, multiplier: 1 },
  ssrm2:  {trigger_time: 0, limit: 4, current: 0, timer: undefined, multiplier: 1 },
  srm4:   {trigger_time: 0, limit: 4, current: 0, timer: undefined, multiplier: 1 },
  srm6:   {trigger_time: 0, limit: 3, current: 0, timer: undefined, multiplier: 1 },
}

/*
 * Stores / Namespace for the ghost heat trigger timer objects
 *   <group name>: <timer>
 *     {key}    <group name>
 *     {object} <timer>
 */
var timers = {
}


/**
 * @param {object} weapon_props - Weapon props
 *
 * 1. Set trigger time for weapon group to '2',
 * 2. Start group trigger timer if not started yet,
 * 3. Increment weapon group counter by 1
 * 4. Compute for the ghost heat if present and apply
 */
var include_ghost_heat = function(weapon_props) {
  var ghost_heat_group = weapon_props.ghost_heat_group

  // Set trigger time for the weapon group to '2'
  data[ghost_heat_group].trigger_time = 2

  // Start group trigger timer if not started yet
  if(data[ghost_heat_group].timer == undefined){

    data[ghost_heat_group].timer = setInterval(
      function(){

        if(data[ghost_heat_group].trigger_time > 0){
          data[ghost_heat_group].trigger_time = data[ghost_heat_group].trigger_time - .1
        }else{
          // TODO : move this to its own method `reset_group_ghost_heat`
          // kill the timer when cooldown is over
          clearInterval(data[ghost_heat_group].timer)
          // remove the reference left behind by clearInterval
          data[ghost_heat_group].current = 0
          //
          data[ghost_heat_group].timer = undefined
          _GhostHeatGroupStore.emit(CHANGE)
        }
      }, 100)
  }

  // Increment weapon group counter by 1
  data[ghost_heat_group].current = data[ghost_heat_group].current + 1

  if(data[ghost_heat_group].current > data[ghost_heat_group].limit){
    console.log("GHOST HEAT PRESENT")

    var ghost_heat_amount = 69

    setTimeout(function(){ HeatActions.add_ghost_heat(ghost_heat_amount) })
    // Apply ghost heat
  }
}


var CHANGE = 'GHOST_HEAT_GROUP_UPDATED'

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


/*
 * Register actions
 */
_GhostHeatGroupStore.dispatch_token = AppDispatcher.register((payload) => {

  var action_type = payload.action_type
  switch(action_type) {
    case HeatConstants.HEAT_APPLY:
      AppDispatcher.waitFor([HeatStore.dispatch_token])
      if(payload.weapon_props.ghost_heat_group !== undefined) {
        include_ghost_heat(payload.weapon_props)
        _GhostHeatGroupStore.emit(CHANGE)
      }
      break
  }
})

export default _GhostHeatGroupStore

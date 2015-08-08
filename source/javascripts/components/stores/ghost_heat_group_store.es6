import AppDispatcher from '../app_dispatcher'
import {EventEmitter} from 'events'
import GhostHeatConstants from '../constants/ghost_heat_constants'

/**
 * Store data format
 *   <group name>: <ghost heat properties>
 *     {key}    <group name>           - Abbreviated Ghost heat group name (e.g. slas, mlas, llas)
 *     {object} <ghost heat properies> :
 *        {float}   trigger_time            - time remaining before `current` counter is reset
 *        {integer} limit                   - number of shots that can be fired within the ghost
 *                                            heat group without triggering ghost heat
 *        {integer} current                 - number of times a weapon has been fired within the `trigger_time`
 *
 */
var data = {
  slas: {trigger_time: 0, limit: 6, current: 0},
  mlas: {trigger_time: 0, limit: 6, current: 0},
}


var check_and_process = function(weapon_props) {
  console.log("Weapon ghost heat is")
  console.log(weapon_props.ghost_heat_group)
  console.log("normal weapon heat is")
  console.log(weapon_props.heat)
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
export default _GhostHeatGroupStore


/*
 * Register actions
 */
AppDispatcher.register((payload) => {

  var action_type = payload.action_type
  switch(action_type) {
    case GhostHeatConstants.GHOST_HEAT_PROCESS:
      check_and_process(payload.weapon_props)
      break
  }
})


import {EventEmitter} from 'events'

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
  slas: {trigger_time: 0, limit: 6, current: 0},
}


var process = function(weapon_props) {
  console.log("Weapon ghost heat is")
  weapon_props.ghost_heat_group
  console.log("normal weapon heat is")
  weapon_props.gheat
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
      process(payload.weapon_props)
      break
  }
})


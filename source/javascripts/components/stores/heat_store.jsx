import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import HeatConstants from '../constants/heat_constants'

console.log("INTITIALIZINGGGHJSJDAKSJDAKSJD")
console.log("INTITIALIZINGGGHJSJDAKSJDAKSJD")
console.log("INTITIALIZINGGGHJSJDAKSJDAKSJD")
console.log("INTITIALIZINGGGHJSJDAKSJDAKSJD")
console.log("INTITIALIZINGGGHJSJDAKSJDAKSJD")
console.log("INTITIALIZINGGGHJSJDAKSJDAKSJD")

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

AppDispatcher.register((payload) => {
  var action_type = payload.action_type
  switch(action_type) {
    case HeatConstants.HEAT_APPLY:
      add_heat(payload.amount)
    _HeatStore.emit(CHANGE)
      break
  }
})

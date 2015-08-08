import {EventEmitter} from 'events'
import AppDispatcher from '../app_dispatcher'
import DamageConstants from '../constants/damage_constants'

/* Store ata
 * @data {float} last             - Damage dealt by previous weapon fire
 * @data {float} total            - Total Amount of damage done since last reset
 * @data {float} dps              - Damage per second
 */

var data = {
  last: 0,
  total: 0,
  dps: 0
}

/**
 * Set last damage dealt
 *   {float} amount
 */
var update_last = function(amount) {
  data.last = amount
}

/**
 * Increase the value of 'last' damage dealt (in cases where weapons are group fired)
 *   {float} amount
 */
var stack_last = function(amount) {
  data.last = data.last + amount
}

/**
 * Increase damage total
 *   {float} amount
 */
var increase_total = function(amount) {
  data.total = data.total + amount
}

var CHANGE = 'DAMAGE_UPDATED'

class DamageStore extends EventEmitter {
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


let _DamageStore = new DamageStore();
export default _DamageStore

AppDispatcher.register((payload) =>{
  var action_type = payload.action_type
  switch(action_type) {
    case DamageConstants.DAMAGE_APPLY:
      update_last(payload.amount)
      increase_total(payload.amount)
      _DamageStore.emit(CHANGE)
      break
    case DamageConstants.DAMAGE_STACK:
      stack_last(payload.amount)
      increase_total(payload.amount)
      _DamageStore.emit(CHANGE)
  }
})


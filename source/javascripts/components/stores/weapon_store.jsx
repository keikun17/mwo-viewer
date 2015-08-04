import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import WeaponConstants from '../constants/weapon_constants'

var CHANGE = 'WEAPON_UPDATED'

var data = {
  last_id: 0,
  equipped_weapons: []
}

/**
 * Equip a weapon
 * @param {string} id
 */
var equip = function(weapon_props) {
  var equipped_weapon = Object.assign({}, weapon_props)
  data.equipped_weapons.push(equipped_weapon)
}

/**
 * Delete a weapon
 * @param {string} id
 */
var destroy = function(index) {
  data.equipped_weapons.splice(index, 1)
}

/**
 * emits a "WEAPON_DID_ALPHA" that causes equipped weapon components subscribed to the action to fire
 * and sets the damage.data.last to the total of all weapons fired
 */
var alpha_strike = function() {
  // TOOD set damage.data.last to the total of all weapons fired
}

class WeaponStore extends EventEmitter {

  // move this to store base class
  get_new_data() {
    return data
  }

  // move this to store base class
  emitChange() {
    console.log("Dito ko sa emitchange sa loob ng heatsink_store")
    console.log("Final Step : Here, we update the heatsink info cooldown an capacity with the updated data : ")
    console.log(data)
    this.emit(CHANGE);
  }

  // move this to store base class
  addChangeListener(callback) {
    console.log("heatsink_store.addChangelistener called para pag may changes sa store, mapopropagate sa react components itong callback na to :")
    console.log(callback)
    this.on(CHANGE, callback);
  }

  // move this to store base class
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}


let _WeaponStore = new WeaponStore();
export default _WeaponStore

AppDispatcher.register((payload) => {
  var action_type = payload.action_type;
  switch(action_type) {
    case WeaponConstants.WEAPON_EQUIP:
      equip(payload.weapon_props)
      _WeaponStore.emit(CHANGE)
      break
    case WeaponConstants.WEAPON_UNEQUIP:
      destroy(payload.index)
      _WeaponStore.emit(CHANGE)
      break
    case WeaponConstants.WEAPON_ALPHA:
      console.log("firing all weapons sa store")
      alpha_strike()
      _WeaponStore.emit(WeaponConstants.WEAPON_DID_ALPHA)
  }
})


import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import WeaponConstants from '../constants/weapon_constants'

var CHANGE = 'WEAPON_UPDATED'

var data = {
  last_id: 0,
  equipped_weapons: {}
}

/**
 * Equip a weapon
 * @param {string} id
 */
var equip = function(weapon_props) {
  var initial_weapon_groups =  { grp1: true, grp2: false, grp3: false, grp4: false, grp5: false, grp6: false }
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var equipped_weapon = Object.assign({id: id, weapon_groups: initial_weapon_groups}, weapon_props)
  data.equipped_weapons[id] = equipped_weapon
}

/**
 * Delete a weapon
 * @param {string} id
 */
var destroy = function(id) {
  delete data.equipped_weapons[id]
}

/** Toggle the weapon group of an equipped weapon
 * @param {string} equipped_weapon_id - ID of the weapon
 * @param {string} group_id - ID of the weapon_group (1, 2, 3. not grp1, grp2)
 */
var toggle_equipped_weapon_group = function(equipped_weapon_id, group_id) {
  var group_id = "grp" + group_id
  var current_value = data.equipped_weapons[equipped_weapon_id].weapon_groups[group_id]
  data.equipped_weapons[equipped_weapon_id].weapon_groups[group_id] = !current_value
}

/**
 * emits a "WEAPON_DID_ALPHA" that causes equipped weapon components subscribed to the action to fire
 * and sets the damage.data.last to the total of all weapons fired
 */
var alpha_strike = function() {
  // TOOD set damage.data.last to the total of all weapons fired
  _WeaponStore.emit(WeaponConstants.WEAPON_WILL_GROUP_FIRE)
  _WeaponStore.emit(WeaponConstants.WEAPON_DID_ALPHA)
}

/**
 * emits a "WEAPON_GROUP_FIRE" that causes equipped weapon under a given group_id to fire
 * and sets the damage.data.last to the total of all weapons fired
 */
var group_fire = function(group_id) {
  // TOOD set damage.data.last to the total of all weapons fired
  console.log(group_id)
  _WeaponStore.emit(WeaponConstants.WEAPON_WILL_GROUP_FIRE)
  _WeaponStore.emit(WeaponConstants.WEAPON_DID_GROUP_FIRE, group_id)
}

class WeaponStore extends EventEmitter {

  // move this to store base class
  get_new_data() {
    return data
  }

  // move this to store base class
  emitChange() {
    this.emit(CHANGE);
  }

  // move this to store base class
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // move this to store base class
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}


let _WeaponStore = new WeaponStore()

_WeaponStore.setMaxListeners(0)

export default _WeaponStore

_WeaponStore.dispatch_token = AppDispatcher.register((payload) => {
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
      setTimeout(alpha_strike)
      break
    case WeaponConstants.WEAPON_GROUP_FIRE:
      // setTimeout(group_fireupayload.group_id))
      setTimeout(function(){group_fire(payload.group_id)})
      _WeaponStore.emit(CHANGE)
      break
    case WeaponConstants.WEAPON_TOGGLE_GROUP:
      toggle_equipped_weapon_group(payload.equipped_weapon_id, payload.group_id)
      _WeaponStore.emit(CHANGE)
      break
  }
})


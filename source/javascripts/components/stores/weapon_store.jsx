import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import WeaponConstants from '../constants/weapon_constants'

var CHANGE = 'WEAPON_UPDATED'

var data = {
  last_id: 0,
  equipped_weapons: {}
}

// This is the 'ticker' that goes through all weapons that is currently in cooldown .
// It it reduces the cooldown counter for each weapon and reactivates them when clock turns 0
var cooldown_ticker = setInterval(function() {

  for(let equipped_weapon_id in data.equipped_weapons) {
    let equipped_weapon = data.equipped_weapons[equipped_weapon_id]
    if(equipped_weapon.is_disabled === false) { continue }

    if(equipped_weapon.cooldown_time_remaining < 0){
      equipped_weapon.cooldown_time_remaining = 0
      equipped_weapon.is_disabled = false
    } else {
      equipped_weapon.cooldown_time_remaining = +((equipped_weapon.cooldown_time_remaining - .1).toFixed(2))
    }

  }
  _WeaponStore.emit(CHANGE)
}, 100)

/**
 * Equip a weapon
 * @param {string} id
 */
var equip = function(weapon_props) {
  var equipped_weapon = Object.assign({
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    weapon_groups: { grp1: true, grp2: false, grp3: false, grp4: false, grp5: false, grp6: false },
    cooldown_time_remaining: 0,
    is_disabled: false,
  }, weapon_props)
  data.equipped_weapons[equipped_weapon.id] = equipped_weapon
}

/**
 * Delete a weapon
 * @param {string} id
 */
var destroy = function(id) {
  delete data.equipped_weapons[id]
}

/**
 * Unequips all weapons
 */

var strip_all = function() {
  console.log("callecalledd")
  data.equipped_weapons = []
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
  _WeaponStore.emit(WeaponConstants.WEAPON_WILL_GROUP_FIRE)
  _WeaponStore.emit(WeaponConstants.WEAPON_DID_ALPHA)
}

/**
 * emits a "WEAPON_GROUP_FIRE" that causes equipped weapon under a given group_id to fire
 * and sets the damage.data.last to the total of all weapons fired
 */
var group_fire = function(group_id) {
  _WeaponStore.emit(WeaponConstants.WEAPON_WILL_GROUP_FIRE)
  _WeaponStore.emit(WeaponConstants.WEAPON_DID_GROUP_FIRE, group_id)
}

/**
 * starts the cooldown process of the equipped weapon, disabling the weapon and, setting cooldown time.
 * @param {string} equipped_weapon_id
 */
var cooldown_weapon = function(equipped_weapon_id) {
  // No-oP if still on cooldown
  if(data.equipped_weapons[equipped_weapon_id].is_disabled === true)  {return}

  // Disable Weapon
  data.equipped_weapons[equipped_weapon_id].is_disabled = true

  // Set Cooldown Timer to the weapon's cooldown time
  data.equipped_weapons[equipped_weapon_id].cooldown_time_remaining = +(data.equipped_weapons[equipped_weapon_id].cooldown_time.toFixed(2))

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
    case WeaponConstants.WEAPON_COOLDOWN:
      cooldown_weapon(payload.equipped_weapon_id)
      _WeaponStore.emit(CHANGE)
      break
    case WeaponConstants.WEAPON_STRIP_ALL:
      strip_all()
      _WeaponStore.emit(CHANGE)
      break
  }
})


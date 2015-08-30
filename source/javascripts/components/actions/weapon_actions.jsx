import AppDispatcher from '../app_dispatcher.es6';
import WeaponConstants from '../constants/weapon_constants'
import WeaponStore from '../stores/weapon_store'


var WeaponActions = {

  /**
   * @param {component} weapon
   */
  equip: function(weapon){
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_EQUIP,
      weapon_props: weapon.props.weapon
    })
  },

  unequip: function(index) {
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_UNEQUIP,
      index: index
    })
  },

  group_fire: function(group_id) {
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_GROUP_FIRE,
      group_id: group_id
    })
  },

  alpha_strike: function() {
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_ALPHA
    })
  },

  toggleWeaponGroup:function(equipped_weapon_id, group_id) {
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_TOGGLE_GROUP,
      equipped_weapon_id: equipped_weapon_id,
      group_id: group_id
    })
  },


  start_cooldown:function(equipped_weapon_id) {
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_COOLDOWN,
      equipped_weapon_id: equipped_weapon_id,
    })
  },


  toggle_list_faction: function() {
    AppDispatcher.dispatch({
    })
  }
}

export default WeaponActions

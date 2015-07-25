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
  }

}

export default WeaponActions

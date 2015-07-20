import AppDispatcher from '../app_dispatcher.es6';
import WeaponConstants from '../constants/weapon_constants'
var WeaponActions = {

  /**
   * @param {component} weapon
   */
  equip: function(weapon){
    AppDispatcher.dispatch({
      action_type: WeaponConstants.WEAPON_EQUIP,
      weapon: weapon
    })
  }

}

export default WeaponActions

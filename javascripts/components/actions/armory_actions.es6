import AppDispatcher from '../app_dispatcher.es6';
import ArmoryConstants from '../constants/armory_constants'

var ArmoryActions = {

  /**
   * Toggles the weapon dataset between IS and clan
   */
  toggle_list_faction: function() {
    AppDispatcher.dispatch({
      action_type: ArmoryConstants.ARMORY_TOGGLE_FACTION
    })
  },

}

export default ArmoryActions

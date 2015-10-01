import AppDispatcher from '../app_dispatcher'
import HeatsinkConstants from '../constants/heatsink_constants'
import CooldownConstants from '../constants/cooldown_constants'
import HeatsinkStore from '../stores/heatsink_store'
import CooldownStore from '../stores/cooldown_store'

var CooldownActions = {

  update_store: function(){
    AppDispatcher.dispatch({
      action_type: CooldownConstants.COOLDOWN_UPDATE
    })
  },

  update_cooldown_time: function() {
    AppDispatcher.dispatch({
      action_type: CooldownConstants.COOLDOWN_ETA_UPDATE
    })
  }

}


export default CooldownActions

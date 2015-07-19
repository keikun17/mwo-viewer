import AppDispatcher from '../app_dispatcher'
import HeatsinkConstants from '../constants/heatsink_constants'
import CooldownConstants from '../constants/cooldown_constants'
import HeatsinkStore from '../stores/heatsink_store'
import CooldownStore from '../stores/cooldown_store'

var CooldownActions = {

  update_store: function(){
    var heatsink_store_data = HeatsinkStore.get_new_data()

    var internal_heatsink_cooldown_modifier
    var external_heatsink_cooldown_modifier

    if(heatsink_store_data.double_heatsinks) {
      internal_heatsink_cooldown_modifier = .2
      external_heatsink_cooldown_modifier = .14
    } else {
      internal_heatsink_cooldown_modifier = .1
      external_heatsink_cooldown_modifier = .1
    }

    var internal_cooldown = (internal_heatsink_cooldown_modifier * heatsink_store_data.internal_heatsinks)
    var external_cooldown = (external_heatsink_cooldown_modifier * heatsink_store_data.external_heatsinks)

    var time_to_zero = "WIP"
    var cool_rate = internal_cooldown + external_cooldown

    AppDispatcher.dispatch({
      action_type: CooldownConstants.COOLDOWN_UPDATE,
      new_data: {time_to_zero: time_to_zero, cool_rate: cool_rate}
    })
  }

}


export default CooldownActions

import AppDispatcher from '../app_dispatcher'
import HeatConstants from '../constants/heat_constants'
import MechConstants from '../constants/mech_constants'
import HeatStore from '../stores/heat_store'

export default {
  enter_overheat: function() {
    AppDispatcher.dispatch({
      action_type: MechConstants.ENTER_OVERHEAT
    })

  },

  exit_overheat: function() {
    AppDispatcher.dispatch({
      action_type: MechConstants.EXIT_OVERHEAT
    })
  }
}

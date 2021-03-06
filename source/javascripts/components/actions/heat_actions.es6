import AppDispatcher from '../app_dispatcher'
import HeatConstants from '../constants/heat_constants'
import HeatStore from '../stores/heat_store'

var HeatActions = {

  apply_heat: function(weapon) {
    AppDispatcher.dispatch({
      action_type: HeatConstants.HEAT_APPLY,
      weapon: weapon
    })
  },

  release_heat: function(amount) {
    AppDispatcher.dispatch({
      action_type: HeatConstants.HEAT_RELEASE,
      amount: amount
    })
  },

  reset_heat: function() {
    AppDispatcher.dispatch({
      action_type: HeatConstants.HEAT_RESET,
    })
  },

  update_capacity: function() {
    AppDispatcher.dispatch({
      action_type: HeatConstants.HEAT_CAPACITY_UPDATE
    })
  },

  add_ghost_heat: function(amount) {
    AppDispatcher.dispatch({
      action_type: HeatConstants.GHOST_HEAT_APPLY,
      amount: amount
    })
  },


}

export default HeatActions

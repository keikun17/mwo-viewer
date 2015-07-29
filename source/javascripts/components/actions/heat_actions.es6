import AppDispatcher from '../app_dispatcher'
import HeatConstants from '../constants/heat_constants'
import HeatStore from '../stores/heat_store'

var HeatActions = {

  apply_heat: function(amount) {
    AppDispatcher.dispatch({
      action_type: HeatConstants.HEAT_APPLY,
      amount: amount
    })
  }
}

export default HeatActions

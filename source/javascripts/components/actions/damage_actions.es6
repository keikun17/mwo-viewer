import AppDispatcher from '../app_dispatcher'
import DamageConstants from '../constants/damage_constants'

var DamageActions = {
  apply_damage: function(amount) {
    AppDispatcher.dispatch({
      action_type: DamageConstants.DAMAGE_APPLY,
      amount: amount
    })
  },
}

export default DamageActions

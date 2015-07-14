// moight not need this,. call from the view's onchange instead
import AppDispatcher from '../app_dispatcher.es6';
import HeatsinkConstants from '../constants/heatsink_constants.es6';
import Heatsink from '../heatsink'

let change_event = 'change'


var HeatsinkActions = {
  /**
   * @param {object} heatsink
   */
  handleViewAction: function(heatsink) {
    console.log("i am in heatsink_actions. dispatching the 'UPDATE_COUNT' action type with the ff 'heatsink' payload : ")
    console.log(heatsink);
    AppDispatcher.dispatch({
      action_type: HeatsinkConstants.HEATSINK_UPDATE_COUNT,
      heatsink: heatsink
    })
  }

}

export default HeatsinkActions

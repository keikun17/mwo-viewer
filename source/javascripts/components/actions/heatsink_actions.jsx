// moight not need this,. call from the view's onchange instead
import AppDispatcher from '../app_dispatcher.es6';
import HeatsinkConstants from '../constants/heatsink_constants.es6';
import Heatsink from '../heatsink'

let change_event = 'change'


var HeatsinkActions = {
  /**
   * @param {object} heatsink
   */
  update_heatsink_count: function(heatsink) {
    console.log("Step 2. i am in heatsink_actions. dispatching the 'UPDATE_COUNT' action_type with the ff 'heatsink' payload received from the view: ")
    console.log(heatsink);
    console.log("We are now about to dispatch 'HEATSINK_UPDATE_COUNT' action (yung dinefine sa step 0)")
    AppDispatcher.dispatch({
      action_type: HeatsinkConstants.HEATSINK_UPDATE_COUNT,
      heatsink: heatsink
    })
  },

  toggle_heatsink_type: function() {
    AppDispatcher.dispatch({
      action_type: HeatsinkConstants.HEATSINK_TOGGLE_TYPE
    })
  }

}



export default HeatsinkActions

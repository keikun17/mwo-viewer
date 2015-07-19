import AppDispatcher from '../app_dispatcher.es6';
import HeatsinkConstants from '../constants/heatsink_constants.es6';
import Heatsink from '../heatsink'
import HeatsinkStore from '../stores/heatsink_store'

var HeatsinkActions = {
  /**
   * @param {object} heatsink
   */
  update_heatsink_count: function(heatsink) {
    console.log("Step 2. i am in heatsink_actions. dispatching the 'UPDATE_COUNT' action_type with the ff 'heatsink' payload received from the view: ")
    console.log(heatsink);
    console.log("We are now about to dispatch 'HEATSINK_UPDATE_COUNT' action (yung dinefine sa step 0)")

    var new_data = {}

    new_data[heatsink['heatsink_location']] = heatsink['amount']
    console.log("NEW DATA IS ")
    console.log(new_data)

    AppDispatcher.dispatch({
      action_type: HeatsinkConstants.HEATSINK_UPDATE_COUNT,
      new_data: new_data
    })
  },

  toggle_heatsink_type: function() {
    var double_heatsinks = !HeatsinkStore.get_new_data().double_heatsinks
    AppDispatcher.dispatch({
      action_type: HeatsinkConstants.HEATSINK_TOGGLE_TYPE,
      new_data: {double_heatsinks: double_heatsinks}
    })
  }

}



export default HeatsinkActions

import AppDispatcher from '../app_dispatcher'
import MapConstants from "../constants/map_constants"

export default {

  change_map: function(game_map) {
    AppDispatcher.dispatch({
      action_type: MapConstants.CHANGE_MAP,
      game_map: game_map
    })
  }

}


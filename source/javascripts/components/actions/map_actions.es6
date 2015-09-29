import AppDispatcher from '../app_dispatcher'
import MapConstants from "../constants/map_constants"

export default var MapActions  = {

  update_map: function(game_map) {
    AppDispatcher.dispatch({
      action_type: MapConstants.CHANGE_MAP,
      map: game_map
    })
  }

}


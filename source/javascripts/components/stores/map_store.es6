import {EventEmitter} from 'events'
import AppDispatcher from '../app_dispatcher';
import MapActions from "../actions/map_actions"
import MapConstants from "../constants/map_constants"

var data = {
  selected_map: null
}

var game_maps = {
  "Forest Colony":           { dissipation: 1    , capacity: 1}    ,
  "Canyon Network":          { dissipation: 1    , capacity: 1}    ,
  "River City":              { dissipation: 1    , capacity: 1}    ,
  "Crimson Strait":          { dissipation: 1    , capacity: 1}    ,

  "Forest Colony Snow":      { dissipation: 1.25  , capacity: 1.25}  ,
  "Alpine Peaks":            { dissipation: 1.25  , capacity: 1.25}  ,
  "Frozen City":             { dissipation: 1.25  , capacity: 1.25}  ,

  "Caustic Valley":          { dissipation: .85 , capacity: .90} ,
  "Terra Therma":            { dissipation: .75 , capacity: .80} ,
  "Tourmaline Desert":       { dissipation: .85 , capacity: .90} ,

  "Caustic Valley [Crater]": { dissipation: 1    , capacity: 1}    ,
  "Terra Therma [Caldera]":  { dissipation: 1    , capacity: 1}    ,
}

var CHANGE = MapConstants.MAP_CHANGED

var change_map = function(game_map) {
  data.selected_map = game_maps[game_map]
  console.log(data.selected_map)
}

class MapStore extends EventEmitter {

  /**
   * Return contents of stored data
   * TODO: Move to a store base class
   */
  get_new_data() {
    return data
  }

  /**
   * Broadcast that the store has changed
   * TODO: Move to a store base class
   */
  emitChange() {
    this.emit(CHANGE);
  }

  /**
   * TODO: Move to a store base class
   */
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  /**
   * TODO: Move to a store base class
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

let _MapStore = new MapStore()

_MapStore.dispatch_token = AppDispatcher.register((payload) =>{
  var action_type = payload.action_type

  switch(action_type) {
    case MapConstants.CHANGE_MAP:
      change_map(payload.game_map)
      _MapStore.emit(CHANGE)
      break
  }

})

export default _MapStore

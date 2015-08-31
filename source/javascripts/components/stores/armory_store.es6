import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import ArmoryConstants from '../constants/armory_constants'
import WeaponList from '../weapons_list'

var CHANGE = "ARMORY_UPDATED"

var data = {
  selected_faction: 'innersphere',
  weapons_list: WeaponList
}

/**
 * Toggles the list of weapons in the armory between IS and Clans
 */

var toggle_weapons_list = function() {
  switch(data.selected_faction) {
    case 'innersphere':
      data.selected_faction = 'clan'
      break
    case 'clan':
      data.selected_faction = 'innersphere'
      break
  }
}


class ArmoryStore extends EventEmitter {

  // move this to store base class
  get_new_data() {
    return data
  }

  // move this to store base class
  emitChange() {
    this.emit(CHANGE);
  }

  // move this to store base class
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // move this to store base class
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}

let _ArmoryStore = new ArmoryStore()

export default _ArmoryStore

_ArmoryStore.dispatch_token = AppDispatcher.register((payload) => {
  var action_type = payload.action_type;

  switch(action_type) {
    case ArmoryConstants.ARMORY_TOGGLE_FACTION:
      toggle_weapons_list()
      _ArmoryStore.emit(CHANGE)
      break
  }
})



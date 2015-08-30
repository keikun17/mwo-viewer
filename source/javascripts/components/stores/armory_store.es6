import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import ArmoryConstants from '../constants/armory_constants'

var CHANGE = "ARMORY_UPDATED"

var data = {current: 'clan'}

/**
 * Toggles the list of weapons in the armory between IS and Clans
 */

var toggle_weapons_list = function() {
  console.log('toggling')
  switch(data.current) {
    case 'innersphere':
      data.current = 'clan'
      break
    case 'clan':
      data.current = 'innersphere'
      break
  }

  console.log(`data is now ${data.current}`)
}


class ArmoryStore extends EventEmitter {

  get_new_data() {
    return data
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



// import EventEmitter from 'event-emitter';
import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import CooldownConstants from '../constants/cooldown_constants'


var data = {
  time_to_zero: 0,
  cool_rate: 0
}

var CHANGE = 'COOLDOWN_STORE_UPDATED'

function update(new_data) {
  data = Object.assign(data, new_data)
}

class CooldownStore extends EventEmitter {

  get_new_data() {
    return data
  }

  // move this to store base class
  emitChange(){
    this.emit(CHANGE)
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

let _CooldownStore = new CooldownStore()

export default _CooldownStore

AppDispatcher.register((payload) => {
  var action_type = payload.action_type

  switch(action_type) {
    case CooldownConstants.COOLDOWN_UPDATE:
      console.log("NEWWWW DATA IS")
      console.log(payload.new_data)
      update(payload.new_data)
      _CooldownStore.emitChange()
      break
  }

})


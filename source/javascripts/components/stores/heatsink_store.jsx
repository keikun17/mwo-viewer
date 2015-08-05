// import EventEmitter from 'event-emitter';
import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import HeatsinkConstants from '../constants/heatsink_constants'


var data = {
  internal_heatsinks: 10,
  external_heatsinks: 4,
  double_heatsinks: false
}


var CHANGE = 'HEATSINK_UPDATE_COUNT'

/*
 * Update the Store's heatsink count
 */
function update(new_data) {
  data = Object.assign(data, new_data)
}


class HeatsinkStore extends EventEmitter {

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

// export the instance, not the class
let _HeatsinkStore = new HeatsinkStore();
export default _HeatsinkStore;

// register the actions of this store
AppDispatcher.register((payload) => {

  var action_type = payload.action_type;

  switch(action_type) {
    case HeatsinkConstants.HEATSINK_UPDATE_COUNT:
      update(payload.new_data)
      _HeatsinkStore.emitChange()
      break;

    case HeatsinkConstants.HEATSINK_TOGGLE_TYPE:
      data.double_heatsinks = !data.double_heatsinks
      _HeatsinkStore.emitChange()
      break
  }
})

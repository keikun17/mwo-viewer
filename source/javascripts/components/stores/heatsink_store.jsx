import EventEmitter from 'event-emitter';

import AppDispatcher from '../app_dispatcher';
import HeatsinkConstants from '../constants/heatsink_constants'


let data = {
  internal_heatsinks: 8,
  externa_heatsink: 4
}

class HeatsinkStore extends EventEmitter {

  getState() {
    return data
  }

  emitChange() {
    this.emit('CHANGE');
  }

  addChangeListener(callback) {
    this.emit('CHANGE', callback);
  }

  removeChangeListener(callback) {
    this.emit('ChANGE', callback);
  }

}

// export the instance, not the class
let _HeatsinkStore = new HeatsinkStore();
 export default _HeatsinkStore;

// register the actions of this store
AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case HeatsinkConstants.FETCHING:
      data = action.data;
      _HeatsinkStore.emitChange();
      break;

    default:
      break;
  }
})

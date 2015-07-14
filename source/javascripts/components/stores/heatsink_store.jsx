// import EventEmitter from 'event-emitter';
import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import HeatsinkConstants from '../constants/heatsink_constants'


let data = {
  internal_heatsinks: 8,
  externa_heatsink: 4
}


var CHANGE_EVENT = 'CHANGE'

/*
 * Update the Store's heatsink count
 */
function update(updates) {
  console.log("nag uupdate si store")
  data.internal_heatsinks = updates.internal_heatsinks;
  data.external_heatsinks = updates.external_heatsinks;
}


class HeatsinkStore extends EventEmitter {

  // move this to store base class
  getState() {
    return data
  }

  // move this to store base class
  emitChange() {
    console.log("Dito ko sa emitchange sa loob ng heatsink_store")
    this.emit(CHANGE_EVENT);
  }

  // move this to store base class
  addChangeListener(callback) {
    console.log("heatsink_store.addChangelistener called para pag may changes sa store, mapopropagate sa react components itong callback na to :")
    console.log(callback)
    this.emit(CHANGE_EVENT, callback);
  }

  // move this to store base class
  removeChangeListener(callback) {
    this.emit(CHANGE_EVENT, callback);
  }

}

// export the instance, not the class
let _HeatsinkStore = new HeatsinkStore();
export default _HeatsinkStore;

// register the actions of this store
AppDispatcher.register((payload) => {
  console.log("Received the message from an action from the view");
  let action = payload.action;

  switch(action.type) {
    case HeatsinkConstants.HEATSINK_UPDATE_COUNT:
      data.internal_heatsinks = payload.heatsink.internal_heatsinks;
      data.external_heatsinks = payload.heatsink.external_heatsinks;
      _HeatsinkStore.emitChange();
      break;

    default:
      break;
  }
})

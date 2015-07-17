// import EventEmitter from 'event-emitter';
import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import HeatsinkConstants from '../constants/heatsink_constants'


var data = {
  internal_heatsinks: 10,
  external_heatsinks: 4
}


var CHANGE = 'HEATSINK_UPDATE_COUNT'

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
  getHeatsinkCount() {
    return data
  }

  // move this to store base class
  emitChange() {
    console.log("Dito ko sa emitchange sa loob ng heatsink_store")
    console.log("Final Step : Here, we update the heatsink info cooldown an capacity with the updated data : ")
    console.log(data)
    this.emit(CHANGE);
  }

  // move this to store base class
  addChangeListener(callback) {
    console.log("heatsink_store.addChangelistener called para pag may changes sa store, mapopropagate sa react components itong callback na to :")
    console.log(callback)
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
console.log("Step 0. : Registering the heatsink_store actions. Aabangan natin yung 'HEATSINK_UPDATE_COUNT' dispatch");
AppDispatcher.register((payload) => {
  console.log("Step 3. [Dispatcher] Received a dispatch order from the {heatsink_component => heatsink_action} with the payload:");
  console.log(payload)

  var action_type = payload.action_type;

  switch(action_type) {
    case HeatsinkConstants.HEATSINK_UPDATE_COUNT:
      console.log("Step 4. [Dispatcher] Recognized that the dispatch order's 'HEATSINK_UPDATE_COUNT' action_type exists")
      console.log("... Updating the data record")
      data.internal_heatsinks = parseInt(payload.heatsink.internal_heatsinks)
      data.external_heatsinks = parseInt(payload.heatsink.external_heatsinks)
      console.log("... data is now :")
      console.log(data)
      _HeatsinkStore.emitChange()
      break;

    default:
      console.log("[Step 4. FAILED] Falls through the dispatcher.. the action type is: " + action_type)
      break;
  }
})

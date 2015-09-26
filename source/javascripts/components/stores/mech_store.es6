import {EventEmitter} from 'events'
import AppDispatcher from '../app_dispatcher'
import HeatStore from './heat_store'
import MechConstants from '../constants/mech_constants'
import HeatConstants from '../constants/heat_constants'
import MechActions from '../actions/mech_actions'

var data = {
  overheating: false
}

var overheat_check = function(){
  var heatsink_store_data = HeatStore.get_new_data()
  var current_heat = heatsink_store_data.value
  var heat_capacity = heatsink_store_data.capacity


  if((current_heat >= heat_capacity) && data.overheating === false){
    console.log(`TRUE BECAUSE current heat is ${current_heat} vs ${heat_capacity}`)
    setTimeout(MechActions.enter_overheat)
  }
  if((current_heat < heat_capacity) && data.overheating === true){
    console.log(`FALSE BECAUSE current heat is ${current_heat} vs ${heat_capacity}`)
    setTimeout(MechActions.exit_overheat)
  }

}

var CHANGE = MechConstants.MECH_UPDATED

class MechStore extends EventEmitter {

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

var _MechStore = new MechStore()

_MechStore.dispatch_token = AppDispatcher.register((payload) => {
  var action_type = payload.action_type
  switch(action_type) {
    case HeatConstants.HEAT_APPLY:
      overheat_check()
      break
    case HeatConstants.HEAT_RELEASE:
      overheat_check()
      break

    case MechConstants.ENTER_OVERHEAT:
      data.overheating = true
      _MechStore.emit(CHANGE)
      break
    case MechConstants.EXIT_OVERHEAT:
      data.overheating = false
      _MechStore.emit(CHANGE)
      break
  }

})

export default _MechStore



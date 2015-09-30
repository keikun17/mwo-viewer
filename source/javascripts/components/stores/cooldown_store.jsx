import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import CooldownConstants from '../constants/cooldown_constants'
import HeatStore from '../stores/heat_store'
import HeatsinkStore from './heatsink_store'

var data = {
  time_to_zero: 0,
  cool_rate: 0
}

var CHANGE = 'COOLDOWN_STORE_UPDATED'

function update(new_data) {
  data = Object.assign(data, new_data)
}


function recalculate_coolrate() {
    var heatsink_store_data = HeatsinkStore.get_new_data()

    var internal_heatsink_cooldown_modifier
    var external_heatsink_cooldown_modifier

    if(heatsink_store_data.double_heatsinks) {
      internal_heatsink_cooldown_modifier = .2
      external_heatsink_cooldown_modifier = .14
    } else {
      internal_heatsink_cooldown_modifier = .1
      external_heatsink_cooldown_modifier = .1
    }

    var internal_cooldown = (internal_heatsink_cooldown_modifier * heatsink_store_data.internal_heatsinks)
    var external_cooldown = (external_heatsink_cooldown_modifier * heatsink_store_data.external_heatsinks)

    var cool_rate = +((internal_cooldown + external_cooldown).toFixed(2))

    data.cool_rate = cool_rate
}

function update_time_to_zero() {
  var time_to_zero = +((HeatStore.get_new_data().value / data.cool_rate).toFixed(2))
  data.time_to_zero = time_to_zero
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

_CooldownStore.dispatch_token = AppDispatcher.register((payload) => {
  var action_type = payload.action_type

  switch(action_type) {
    case CooldownConstants.COOLDOWN_UPDATE:
      recalculate_coolrate()
      _CooldownStore.emitChange()
      break
    case CooldownConstants.COOLDOWN_ETA_UPDATE:
      update_time_to_zero()
      _CooldownStore.emitChange()
      break
  }

})


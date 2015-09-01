import {EventEmitter} from 'events'
import AppDispatcher from '../app_dispatcher'
import KeybindingConstants from '../constants/keybinding_constants'

var mappings = {}

var CHANGE = "KEYBINDING_CHANGED"

/**
 * Check keymappings for matching functions bound to that keypress
 */
window.onkeypress = function(e) {
  if(document.activeElement.tagName === "INPUT") {return}
  var value = String.fromCharCode(e.keyCode)
  _KeybindingStore.get_key_mappings()[value]()
}

/**
 * Assigns a hotkey to a function
 */
var assign = function(__key, mapping) {
  mappings[__key] = mapping
}

class KeybindingStore extends EventEmitter {
  get_key_mappings() {
    return mappings
  }
}

var _KeybindingStore = new KeybindingStore()

export default _KeybindingStore

_KeybindingStore.dispatch_token = AppDispatcher.register((payload) => {
  var action_type = payload.action_type;
  switch(action_type) {
    case KeybindingConstants.KEYBINDING_ASSIGN:
      assign(payload.__key, payload.mapping)
      _KeybindingStore.emit(CHANGE)
      break
  }
})




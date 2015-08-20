import AppDispatcher from '../app_dispatcher.es6';
import KeybindingConstants from '../constants/keybinding_constants'

var KeybindingActions = {
  assign: function(__key, mapping) {
    AppDispatcher.dispatch({
      action_type: KeybindingConstants.KEYBINDING_ASSIGN,
      __key: __key,
      mapping: mapping
    })
  },
}

export default KeybindingActions

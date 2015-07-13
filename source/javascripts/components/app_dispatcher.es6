import React from 'react'
import {Dispatcher} from 'flux';

var appDispatcher = new Dispatcher();

class AppDispatcher extends Dispatcher {

  handleAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });

  }
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher

import {Dispatcher} from 'flux';


class AppDispatcher extends Dispatcher {

  handleViewAction(action) {
    console.log("--------------")
    console.log("Dispatcher handling an action: ");
    console.log(action);
    console.log("--------------")
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });

  }
}

let _AppDispatcher = new AppDispatcher();

// let _AppDispatcher = new Dispatcher();

export default _AppDispatcher

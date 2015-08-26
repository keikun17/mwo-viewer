import React from 'react';
import EventEmitter from 'event-emitter';

import Mech from './mech';
import Armory from './armory';
import weapons_list from './weapons_list';
import appDispatcher from './app_dispatcher';

class MechViewer extends React.Component {

  getStyle() {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch'
    }
  }

  render() {
    return <mechviewer style={this.getStyle()}>
      <Mech/>
      <Armory weapons_list={weapons_list}/>
    </mechviewer>
  }
}

export default MechViewer

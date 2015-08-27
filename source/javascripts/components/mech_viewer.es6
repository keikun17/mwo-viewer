import React from 'react'
import EventEmitter from 'event-emitter'

import Armory from './armory'
import Info from './info'
import Equipment from './equipment'
import weapons_list from './weapons_list'
import appDispatcher from './app_dispatcher'

class MechViewer extends React.Component {

  getStyle() {
    return {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'row',
      height: '100%',
      flexWrap: 'wrap',
    }
  }

  render() {
    return <mechviewer style={this.getStyle()}>
      <Info/>
      <Equipment/>
      <Armory weapons_list={weapons_list}/>
    </mechviewer>
  }
}

export default MechViewer

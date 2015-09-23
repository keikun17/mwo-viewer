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
      flexWrap: 'wrap',
      paddingBottom: '30px'
    }
  }

  render() {
    return <mechviewer style={{display: 'flex', flexDirection: 'column'}}>
      <div style={this.getStyle()}>
        <Info/>
        <Equipment/>
        <Armory weapons_list={weapons_list}/>
      </div>
      <footer>
        <p>
          This Thing © 2015
          •
          @keikun17
          •
          'Marthe Pryde' in-game
          •
          <a href="http://mwomercs.com/forums/topic/135725-mechwarrior-online-heat-simulator-ghost-heat-ambience-temp-effects/">Discuss here</a>
        </p>
        <p>
          MechWarrior: Online Copyright © 2012-2015 Piranha Games Inc.
        </p>
      </footer>
    </mechviewer>
  }
}

export default MechViewer

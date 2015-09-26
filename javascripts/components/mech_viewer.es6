import React from 'react'
import EventEmitter from 'event-emitter'
import Armory from './armory'
import Info from './info'
import Equipment from './equipment'
import weapons_list from './weapons_list'
import appDispatcher from './app_dispatcher'
import MechStore from './stores/mech_store'
import MechConstants from './constants/mech_constants'

class MechViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = MechStore.get_new_data()
  }

  componentDidMount() {
    MechStore.on(MechConstants.MECH_UPDATED, this.update_component.bind(this) )
  }

  update_component() {
    this.setState(MechStore.get_new_data())
  }


  emergency_lights_on() {
    console.log("SUNOG")
  }

  emergency_lights_off() {
    console.log("WALA NA SUNOG")
  }


  getClassNames() {
    if(this.state.overheating == true){
      return 'overheating'
    } else {
      return 'cool'
    }

  }

  render() {
    return <mechviewer className={this.getClassNames()}>
      <mechviewer_content>
        <Info/>
        <Equipment/>
        <Armory weapons_list={weapons_list}/>
      </mechviewer_content>
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

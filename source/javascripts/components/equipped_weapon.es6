import React from 'react'
import WeaponTrigger from './weapon_trigger'
import WeaponActions from './actions/weapon_actions'

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
    this.state = { cooldownTimeRemaining: 0 }
  }

  componentWillMount() {
    console.log("will remount")
  }

  componentDidMount() {
    this.cooldown_timer = setInterval(this.tick, 1000);
  }

  render() {
    return <equipped_weapon id={this.props.id} key={this.props.key} style={this.styles}>
      <WeaponTrigger on_click={ this.disable_weapon.bind(this) } />
      <remove_weapon_button onClick={this._remove.bind(this)}/>
      <span>
      {this.props.name}
      </span>
      <cooldown_timer>{ this.state.cooldownTimeRemaining }s</cooldown_timer>
    </equipped_weapon>
  }

  _remove() {
    var index = this.props.id
    WeaponActions.unequip(index)
  }

  disable_weapon() {
    this.setState( { cooldownTimeRemaining: 4.2 } )
    this.cooldown_timer = setInterval(this.cooldown_tick.bind(this), 100);
  }

  cooldown_tick() {
    console.log("tick...")
    var time_remaining = this.state.cooldownTimeRemaining - .1
    time_remaining = time_remaining.toFixed(2)

    if(time_remaining < 0){
      this.setState({ cooldownTimeRemaining: 0 });
      clearInterval(this.cooldown_timer)
    } else {
      this.setState({ cooldownTimeRemaining: time_remaining });
    }

  }

}

export default EquippedWeapon

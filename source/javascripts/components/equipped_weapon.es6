import React from 'react'
import WeaponTrigger from './weapon_trigger'

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return <equipped_weapon key={this.props.id} style={this.styles}>
      <WeaponTrigger/>
      <remove_weapon_button/>
      <span>
      {this.props.name}
      </span>
      <cooldown_timer>3.2s</cooldown_timer>
    </equipped_weapon>
  }

}

export default EquippedWeapon

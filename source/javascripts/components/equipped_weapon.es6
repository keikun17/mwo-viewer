import React from 'react'
import WeaponTrigger from './weapon_trigger'
import WeaponActions from './actions/weapon_actions'

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    console.log("creating equipment with the ff props")
    console.log(this.props)
    return <equipped_weapon id={this.props.id} key={this.props.key} style={this.styles}>
      <WeaponTrigger/>
      <remove_weapon_button onClick={this._remove.bind(this)}/>
      <span>
      {this.props.name}
      </span>
      <cooldown_timer>3.2s</cooldown_timer>
    </equipped_weapon>
  }


  _remove() {
    var index = this.props.id
    WeaponActions.unequip(index)
  }


}

export default EquippedWeapon

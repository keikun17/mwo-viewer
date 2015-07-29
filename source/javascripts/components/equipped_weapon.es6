import React from 'react'
import WeaponActions from './actions/weapon_actions'
import HeatActions from './actions/heat_actions'

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
    this.state = { cooldownTimeRemaining: 0, is_disabled: false }
  }

  componentWillMount() {
    console.log("mounting weapon")
  }

  componentWillUnmount() {
    clearInterval(this.cooldown_timer)
  }

  componentDidMount() {
    this.cooldown_timer = setInterval(this.tick, 1000);
  }

  render() {
    var className = this.state.is_disabled ? "disabled" : ""

    return <equipped_weapon className={className} id={this.props.id} key={this.props.key} style={this.styles}>
      <cooldown_timer>{ this.state.cooldownTimeRemaining }s</cooldown_timer>
      <weapon_trigger className={className} onClick={ this.fire_weapon.bind(this) } />
      <remove_weapon_button onClick={this._remove.bind(this)}/>
      <span>
      {this.props.name}
      </span>
    </equipped_weapon>
  }

  _remove() {
    console.log("removing")
    var index = this.props.id
    WeaponActions.unequip(index)
  }


  fire_weapon() {
    this.disable_weapon()
    HeatActions.apply_heat(this.props.heat)
  }

  disable_weapon() {
    if(this.state.is_disabled === true) { return }

    clearInterval(this.cooldown_timer)
    this.setState({
      cooldownTimeRemaining: this.props.cooldown_time ,
      is_disabled: true
    })
    this.cooldown_timer = setInterval(this.cooldown_tick.bind(this), 100);
  }

  cooldown_tick() {
    console.log("tick...")
    var time_remaining = this.state.cooldownTimeRemaining - .1
    time_remaining = time_remaining.toFixed(2)

    if(time_remaining < 0){
      this.setState({ cooldownTimeRemaining: 0, is_disabled: false });
      clearInterval(this.cooldown_timer)
    } else {
      this.setState({ cooldownTimeRemaining: time_remaining });
    }

  }

}

export default EquippedWeapon

import React from 'react'
import WeaponActions from './actions/weapon_actions'
import HeatActions from './actions/heat_actions'
import DamageActions from './actions/damage_actions'
import WeaponStore from './stores/weapon_store'
import WeaponConstants from './constants/weapon_constants'

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
    this.state = { cooldownTimeRemaining: 0, is_disabled: false }
  }

  componentWillUnmount() {
    clearInterval(this.cooldown_timer)
  }

  componentDidMount() {
    WeaponStore.on(WeaponConstants.WEAPON_DID_ALPHA, this.group_fire_weapon.bind(this))
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

  group_fire_weapon() {
    if(this.state.is_disabled !== true) {
      HeatActions.apply_heat(this.props.heat)
      DamageActions.stack_damage(this.props.damage)
    }
    this.disable_weapon()
  }

  fire_weapon() {
    if(this.state.is_disabled !== true) {
      HeatActions.apply_heat(this.props)
      DamageActions.apply_damage(this.props.damage)
    }
    this.disable_weapon()
  }

  // TODO : Component should not manage its own state like this. implement and user equipped_weapon_wrapper_store
  disable_weapon() {
    if(this.state.is_disabled === true) { return }

    clearInterval(this.cooldown_timer)
    this.setState({
      cooldownTimeRemaining: this.props.cooldown_time ,
      is_disabled: true
    })
    this.cooldown_timer = setInterval(this.cooldown_tick.bind(this), 100);
  }

  // TODO : Component should not manage its own state like this. implement and user equipped_weapon_wrapper_store
  cooldown_tick() {
    console.log("tick...")
    var time_remaining = this.state.cooldownTimeRemaining - .1
    time_remaining = +(time_remaining.toFixed(2))

    if(time_remaining < 0){
      this.setState({ cooldownTimeRemaining: 0, is_disabled: false });
      clearInterval(this.cooldown_timer)
    } else {
      this.setState({ cooldownTimeRemaining: time_remaining });
    }

  }

}

export default EquippedWeapon

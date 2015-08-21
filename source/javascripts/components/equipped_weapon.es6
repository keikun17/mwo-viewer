import React from 'react'
import WeaponActions from './actions/weapon_actions'
import HeatActions from './actions/heat_actions'
import DamageActions from './actions/damage_actions'
import WeaponStore from './stores/weapon_store'
import GhostHeatGroupStore from './stores/ghost_heat_group_store'
import WeaponConstants from './constants/weapon_constants'
import WeaponGroup from './weapon_group'

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cooldownTimeRemaining: 0,
      // is_disabled: false,
      shots_before_ghost: this.count_shots_before_ghost(),
    }
  }

  count_shots_before_ghost() {
    var ghost_heat_group = GhostHeatGroupStore.get_new_data()[this.props.ghost_heat_group]
    if(ghost_heat_group){
      var shots = this.props.ghost_limit - ghost_heat_group.current
      return shots
    }
  }

  update_shots_before_ghost() {
    this.setState({shots_before_ghost: this.count_shots_before_ghost()})
  }

  componentWillUnmount() {
    WeaponStore.removeListener(WeaponConstants.WEAPON_DID_ALPHA, this.group_fire_weapon.bind(this))
    console.log("weaponstore listeners are")
    console.log(WeaponStore.listeners(WeaponConstants.WEAPON_DID_ALPHA))
    console.log("weaponstore listeners are")
    console.log(GhostHeatGroupStore.listeners('GHOST_HEAT_GROUP_UPDATED'))
    clearInterval(this.cooldown_timer)
    GhostHeatGroupStore.removeListener(this.onGhostHeatChange, this.update_shots_before_ghost.bind(this))
    console.log("compinent unmounts")
    WeaponStore.removeListener(WeaponConstants.WEAPON_DID_GROUP_FIRE, this.group_fire_weapon)
    WeaponStore.removeListener(WeaponConstants.WEAPON_DID_GROUP_FIRE, this.group_fire_weapon.bind(this))
  }

  componentDidMount() {
    WeaponStore.on(WeaponConstants.WEAPON_DID_ALPHA, this.group_fire_weapon.bind(this, 'ALL'))
    WeaponStore.on(WeaponConstants.WEAPON_DID_GROUP_FIRE, this.group_fire_weapon.bind(this))
    if(this.state.shots_before_ghost !== 0) {
      GhostHeatGroupStore.addChangeListener( this.update_shots_before_ghost.bind(this))
    }
  }

  _remove() {
    WeaponActions.unequip(this.props.id)
  }

  group_fire_weapon(group_id) {
    console.log(group_id)
    if(this.props.is_disabled !== true) {
      if(group_id === 'ALL'){
        // If Alpha Strike
        HeatActions.apply_heat(this.props)
        DamageActions.stack_damage(this.props.damage)
        this.disable_weapon()
      } else if (this.props.weapon_groups["grp" + group_id] === true) {
        // If Group Fire
        HeatActions.apply_heat(this.props)
        DamageActions.stack_damage(this.props.damage)
        this.disable_weapon()
      }
    }
  }

  fire_weapon() {
    if(this.state.is_disabled !== true) {
      HeatActions.apply_heat(this.props)
      DamageActions.apply_damage(this.props.damage)
      WeaponActions.start_cooldown(this.props.id)
    }
    // this.disable_weapon()
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
    var time_remaining = this.state.cooldownTimeRemaining - .1
    time_remaining = +(time_remaining.toFixed(2))

    if(time_remaining < 0){
      this.setState({ cooldownTimeRemaining: 0, is_disabled: false });
      clearInterval(this.cooldown_timer)
    } else {
      this.setState({ cooldownTimeRemaining: time_remaining });
    }

  }

  render() {
    var className = this.props.is_disabled ? "disabled" : ""
    var shots_before_ghost = ""

    if(this.props.ghost_limit){
      shots_before_ghost =  "[" + this.state.shots_before_ghost  + "]"
    }

    return <equipped_weapon className={className} id={this.props.id} key={this.props.key} style={this.styles}>
      <cooldown_timer>{ this.props.cooldown_time_remaining }s</cooldown_timer>
      <weapon_trigger className={className} onClick={ this.fire_weapon.bind(this) } />
      <remove_weapon_button onClick={this._remove.bind(this)}/>
      <span>
      {this.props.name}
      {shots_before_ghost}
      </span>
      <weapon_group_wrapper>
        <WeaponGroup group_id="1" selected={this.props.weapon_groups.grp1}  equipped_weapon_id={ this.props.id } />
        <WeaponGroup group_id="2" selected={this.props.weapon_groups.grp2}  equipped_weapon_id={ this.props.id } />
        <WeaponGroup group_id="3" selected={this.props.weapon_groups.grp3}  equipped_weapon_id={ this.props.id } />
        <WeaponGroup group_id="4" selected={this.props.weapon_groups.grp4}  equipped_weapon_id={ this.props.id } />
        <WeaponGroup group_id="5" selected={this.props.weapon_groups.grp5}  equipped_weapon_id={ this.props.id } />
        <WeaponGroup group_id="6" selected={this.props.weapon_groups.grp6}  equipped_weapon_id={ this.props.id } />
      </weapon_group_wrapper>
    </equipped_weapon>
  }


}

export default EquippedWeapon

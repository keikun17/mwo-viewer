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
  }

  count_shots_before_ghost() {
    var ghost_heat_group = GhostHeatGroupStore.get_new_data()[this.props.ghost_heat_group]
    if(ghost_heat_group){
      var shots = this.props.ghost_limit - ghost_heat_group.current
      return (" [" + shots + "]")
    }
  }

  componentWillUnmount() {
    WeaponStore.removeListener(WeaponConstants.WEAPON_DID_ALPHA, this.group_fire_weapon.bind(this))
    clearInterval(this.cooldown_timer)
    WeaponStore.removeListener(WeaponConstants.WEAPON_DID_GROUP_FIRE, this.group_fire_weapon)
    WeaponStore.removeListener(WeaponConstants.WEAPON_DID_GROUP_FIRE, this.group_fire_weapon.bind(this))
  }

  componentDidMount() {
    WeaponStore.on(WeaponConstants.WEAPON_DID_ALPHA, this.group_fire_weapon.bind(this, 'ALL'))
    WeaponStore.on(WeaponConstants.WEAPON_DID_GROUP_FIRE, this.group_fire_weapon.bind(this))
  }

  _remove() {
    WeaponActions.unequip(this.props.id)
  }

  group_fire_weapon(group_id) {
    var weapon = WeaponStore.get_new_data().equipped_weapons[this.props.id]
    if(typeof(weapon) === 'undefined') { return }

    if((group_id === 'ALL') || (this.props.weapon_groups["grp" + group_id] === true)) {
      this.fire_weapon()
    }
  }

  fire_weapon() {
    var weapon = WeaponStore.get_new_data().equipped_weapons[this.props.id]
    if (weapon.is_disabled === true) { return }
    HeatActions.apply_heat(weapon)
    DamageActions.stack_damage(weapon.damage)
    WeaponActions.start_cooldown(weapon.id)
  }

  render() {
    var className = this.props.is_disabled ? "disabled " : ""

    switch(this.props.type) {
      case 'mis':
        var weapon_class = 'missile'
      break
      case 'las':
        var weapon_class = 'laser'
      break
      case 'bal':
        var weapon_class = 'ballistic'
      break
    }

    className = className + weapon_class

    return <equipped_weapon className={className} id={this.props.id} key={this.props.key} style={this.styles}>
      <cooldown_timer>{ this.props.cooldown_time_remaining }s</cooldown_timer>
      <weapon_trigger className={className} onClick={ this.fire_weapon.bind(this) } />
      <remove_weapon_button onClick={this._remove.bind(this)}/>
      <span>
      { this.props.name }
      { this.count_shots_before_ghost() }
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

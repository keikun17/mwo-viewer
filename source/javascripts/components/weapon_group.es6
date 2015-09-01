import React from 'react'
import WeaponActions from './actions/weapon_actions'

export default class WeaponGroup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      enabled: this.is_enabled()
    }
  }

  is_enabled(){
    return this.props.selected === true
  }

  class_names(){
    if(this.is_enabled()) {
      return "selected"
    }
  }

  toggleWeaponGroup() {
    WeaponActions.toggleWeaponGroup(this.props.equipped_weapon_id, this.props.group_id)
  }


  render() {
    return <weapon_group className={this.class_names()} onClick={this.toggleWeaponGroup.bind(this) }>{this.props.group_id}</weapon_group>
  }
}

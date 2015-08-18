import React from 'react'

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
    if(this.state.enabled) {
      return "selected"
    }
  }

  toggleWeaponGroup() {
    console.log(this.props.equipped_weapon_id)
    console.log(this.props.group_id)
    WeaponActions.assignWeaponGroup(this.props.equipped_weapon_id, this.props.group_id)
  }


  render() {
    return <weapon_group className={this.class_names()} onClick={ this.toggleGroup.bind(this) } >{this.props.group_id}</weapon_group>
  }
}

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
  render() {
    return <weapon_group className={this.class_names()}>{this.props.group_id}</weapon_group>
  }
}


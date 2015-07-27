import React from 'react'

class WeaponTrigger extends  React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    var className = this.props.is_disabled ? "disabled" : ""
    return <weapon_trigger className={className} onClick={ this.props.on_click }/>
  }

}

export default WeaponTrigger

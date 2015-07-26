import React from 'react'

class WeaponTrigger extends  React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return <weapon_trigger onClick={ this.props.on_click }/>
  }

}

export default WeaponTrigger

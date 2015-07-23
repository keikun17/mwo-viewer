var React = require('react');

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return <equipped_weapon key={this.props.id} style={this.styles}>
      <fire_button className="ion-arrow-shrink" />
      <remove_weapon_button className="ion-android-delete"/>
      <span>
      {this.props.name}
      </span>
      <cooldown_timer>3.2s</cooldown_timer>
    </equipped_weapon>
  }

}

export default EquippedWeapon

var React = require('react');

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
  }


  styles = {
    display: 'block',
    border: '1px solid green',
    borderRadius: '4px',
    marginTop: '3px',



  }

  render() {
    return <equipped_weapon key={this.props.id} style={this.styles}>
      <fire_button className="ion-arrow-shrink" />
      <remove_button className="ion-android-delete"/>
      {this.props.name}
      <cooldown_timer>3.2s</cooldown_timer>
    </equipped_weapon>
  }

}

export default EquippedWeapon

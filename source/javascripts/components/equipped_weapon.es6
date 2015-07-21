var React = require('react');

class EquippedWeapon extends React.Component {

  constructor(props) {
    super(props)
  }


  styles = {display: 'block'}

  render() {
    return <equipped_weapon style={this.styles}>
      {this.props.name}
    </equipped_weapon>
  }

}

export default EquippedWeapon

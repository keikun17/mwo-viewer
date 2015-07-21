var React = require('react');
var Heatsink = require('./heatsink')
import WeaponStore from "./stores/weapon_store"

class Equipment extends React.Component {
  styles: {
    paddingLeft: '10px',
    flex: '1 0 0',
  }


  componentDidMount() {
    WeaponStore.addChangeListener(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState({equipped_weapons})

  }

  render() {

    var equipped_weapons = this.props.equipped_weapons

    return <equipments style={this.styles}>

      <h1>Equipments</h1>
      <Heatsink/>

    </equipments>
  }
}

export default Equipment

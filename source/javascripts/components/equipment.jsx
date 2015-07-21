var React = require('react');
var Heatsink = require('./heatsink')
import WeaponStore from "./stores/weapon_store"
import EquippedWeapon from "./equipped_weapon"

class Equipment extends React.Component {
  styles: {
    paddingLeft: '10px',
    flex: '1 0 0',
  }

  constructor(props) {
    super(props)
    this.state = {equipped_weapons: []}
  }


  componentDidMount() {
    WeaponStore.addChangeListener(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState({
      equipped_weapons: WeaponStore.get_new_data().equipped_weapons
    })
  }

  render() {

    var equipped_weapons = this.state.equipped_weapons.map(function(weapon ,index ,equipped_weapons){
      let _weapon = weapon.props.weapon
      console.log('weapon is')
      console.log(weapon)
      console.log('index is')
      console.log(index)
      console.log('equipped weapons is')
      console.log(equipped_weapons)

      return <EquippedWeapon name={_weapon.name} id={_weapon.id} />
    })

    return <equipments style={this.styles}>

      <h1>Equipments</h1>
      <Heatsink/>
      {equipped_weapons}

    </equipments>
  }
}

export default Equipment

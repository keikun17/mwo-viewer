var React = require('react');
var Heatsink = require('./heatsink')
import WeaponStore from "./stores/weapon_store"
import EquippedWeapon from "./equipped_weapon"
import WeaponActions from './actions/weapon_actions'

class Equipment extends React.Component {
  getStyle() {
    return {
      paddingLeft: '10px',
      flex: '1 0 0' }
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

  fireAllWeapons(){
    console.log('fireallweapons')
    WeaponActions.alpha_strike()
  }

  render() {

    var equipped_weapons = this.state.equipped_weapons.map(function(weapon ,index ,equipped_weapons){
      let _weapon = weapon

      return <EquippedWeapon id={index}
        key={index}
        name={_weapon.name}
        weapon_id={_weapon.weapon_id}
        cooldown_time={_weapon.cooldown_time}
        heat={_weapon.heat}
        damage={_weapon.damage}
        />
    })

    return <equipments style={this.getStyle()}>

      <h1>Equipments</h1>
      <Heatsink/>
      <alpha_strike onClick={this.fireAllWeapons.bind(this)} >PINDOT</alpha_strike>
      <equipped_weapons>
        {equipped_weapons}
      </equipped_weapons>

    </equipments>
  }
}

export default Equipment

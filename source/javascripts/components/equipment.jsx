var React = require('react');
var Heatsink = require('./heatsink')
import WeaponActions from './actions/weapon_actions'
import EquippedWeaponsWrapper from './equipped_weapons_wrapper'

class Equipment extends React.Component {
  getStyle() {
    return {
      paddingLeft: '10px',
      flex: '1 0 0' }
  }

  constructor(props) {
    super(props)
  }


  fireAllWeapons(){
    console.log('fireallweapons')
    WeaponActions.alpha_strike()
  }

  render() {

    return <equipments style={this.getStyle()}>
      <h1>Equipments</h1>
      <Heatsink/>
      <alpha_strike onClick={this.fireAllWeapons.bind(this)} >Alpha Strike</alpha_strike>
      <EquippedWeaponsWrapper />
    </equipments>
  }
}

export default Equipment

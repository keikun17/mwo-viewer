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
    WeaponActions.alpha_strike()
  }

  group_fire(group_id) {
    WeaponActions.group_fire(group_id)
  }

  render() {

    return <equipments style={this.getStyle()}>
      <h1>Equipments</h1>
      <Heatsink/>
      <alpha_strike onClick={this.fireAllWeapons.bind(this)} >Alpha Strike</alpha_strike>
      <weapon_group_trigger onClick={ this.group_fire.bind(this, 1)}>1</weapon_group_trigger>
      <weapon_group_trigger onClick={ this.group_fire.bind(this, 2)} >2</weapon_group_trigger>
      <weapon_group_trigger onClick={ this.group_fire.bind(this, 3)} >3</weapon_group_trigger>
      <weapon_group_trigger onClick={ this.group_fire.bind(this, 4)} >4</weapon_group_trigger>
      <weapon_group_trigger onClick={ this.group_fire.bind(this, 5)} >5</weapon_group_trigger>
      <weapon_group_trigger onClick={ this.group_fire.bind(this, 6)} >6</weapon_group_trigger>
      <EquippedWeaponsWrapper />
    </equipments>
  }
}

export default Equipment

var React = require('react')
var Heatsink = require('./heatsink')
import WeaponActions from './actions/weapon_actions'
import EquippedWeaponsWrapper from './equipped_weapons_wrapper'
import GroupTrigger from './group_trigger'
import Map from "./map"

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
      <h2>Equipments</h2>
      <Heatsink/>
      <Map />
      <triggers>
        <alpha_strike onClick={this.fireAllWeapons.bind(this)} >Alpha Strike</alpha_strike>
        <group_trigger_wrapper>
          <span className="small-hide">Use the num row on your Keyboard</span>
          <GroupTrigger group_id="1" />
          <GroupTrigger group_id="2" />
          <GroupTrigger group_id="3" />
          <GroupTrigger group_id="4" />
          <GroupTrigger group_id="5" />
          <GroupTrigger group_id="6" />
        </group_trigger_wrapper>
      </triggers>
      <EquippedWeaponsWrapper />
    </equipments>
  }
}

export default Equipment

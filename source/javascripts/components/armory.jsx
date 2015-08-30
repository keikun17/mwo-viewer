var React = require('react');
var Weapon = require('./weapon');
import FactionSelect from './faction_select'
import ArmoryStore from './stores/armory_store'

class Armory extends React.Component {

  constructor(props) {
    super(props)
    window.x = ArmoryStore.get_new_data()
    this.state = {
      weapons_list: ArmoryStore.get_new_data().weapon_list
    }
  }

  render(){
    var weapons = this.state.weapons_list.map(function(weapon, index, weapons_list){
      return <Weapon weapon={weapon} key={index}/>
    });

    var laser_weapons = weapons.select

    return <armory>
      <h1>
        Armory
      </h1>
      <FactionSelect/>
      {weapons}
      </armory>
  }
}

module.exports = Armory;

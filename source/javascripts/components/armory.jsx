var React = require('react');
var Weapon = require('./weapon');
import FactionSelect from './faction_select'
import ArmoryStore from './stores/armory_store'
import SmurfyScraper from  './smurfy_scraper'

class Armory extends React.Component {

  constructor(props) {
    super(props)

    // pre-bind
    this.update_weapon_list = this.update_weapon_list.bind(this)

    var store_data = ArmoryStore.get_new_data()
    this.state = {
      weapons_list: store_data.weapons_list[store_data.selected_faction]
    }
  }


  update_weapon_list() {
    var store_data = ArmoryStore.get_new_data()
    this.setState({
      weapons_list: store_data.weapons_list[store_data.selected_faction]
    })
  }

  componentDidMount() {
    ArmoryStore.addChangeListener(this.update_weapon_list)
  }

  render(){
    var weapons = this.state.weapons_list.map(function(weapon, index, weapons_list){
      return <Weapon weapon={weapon} key={index}/>
    });

    var laser_weapons = weapons.select

    return <armory>
      <h2>
        Armory
      </h2>
      <SmurfyScraper/>
      <FactionSelect/>
      {weapons}
      </armory>
  }
}

module.exports = Armory;

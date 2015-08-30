var React = require('react');
var Weapon = require('./weapon');
import FactionSelect from './faction_select'

var Armory = React.createClass({

  render: function(){
    var weapons = this.props.weapons_list.map(function(weapon, index, weapons_list){
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
});

module.exports = Armory;

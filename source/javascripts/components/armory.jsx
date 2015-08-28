var React = require('react');
var Weapon = require('./weapon');

var Armory = React.createClass({

  styles: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '10px',
    flex: '1 0 0',
    minWidth: '231px',
  },

  render: function(){
    var weapons = this.props.weapons_list.map(function(weapon, index, weapons_list){
      return <Weapon weapon={weapon} key={index}/>
    });

    var laser_weapons = weapons.select

    return <armory style={this.styles}>
      <h1>
        Armory
      </h1>
      {weapons}
      </armory>
  }
});

module.exports = Armory;

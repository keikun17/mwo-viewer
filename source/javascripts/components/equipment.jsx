var React = require('react');
var Heatsink = require('./heatsink')

var Equipment = React.createClass({
  styles: {
    paddingLeft: '10px',
    flex: '1 0 0',
  },

  render: function(){
    return <equipments style={this.styles}>
      <h1>Equipments</h1>
      <Heatsink/>
      <div id="equipped_weapons" />
    </equipments>
  }
})

module.exports  = Equipment;

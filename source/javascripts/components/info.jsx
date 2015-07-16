var React = require('react');
var MapInfo = require('./map_info')
var Heat = require('./heat_capacity');
var DamageMeter = require('./damage_meter')
var Cooldown = require('./cooldown')

var Info = React.createClass({
  styles: {
    flex: '1 0 0',
    paddingLeft: '10px'
  },

  render: function(){
    return <info style={this.styles}>
      <h1>Info</h1>
      <Heat/>
      <Cooldown/>
      <DamageMeter />
      <MapInfo />
    </info>
  }
})

module.exports = Info;

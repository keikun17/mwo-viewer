var React = require('react');
var MapInfo = require('./map_info')
var Heat = require('./heat')
var DamageMeter = require('./damage_meter')
var Cooldown = require('./cooldown')
var EventLog = require('./event_log')

var Info = React.createClass({
  styles: {
    flex: '1 0 0',
    paddingLeft: '10px'
  },

  render: function(){
    return <info style={this.styles}>
      <h1>Info</h1>
      <div style={{display:'flex'}}>
        <Heat className='info'/>
        <Cooldown className='info'/>
      </div>
      <DamageMeter />
      <MapInfo />
      <EventLog/>
    </info>
  }
})

module.exports = Info;

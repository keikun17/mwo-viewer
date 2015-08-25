var React = require('react');
var MapInfo = require('./map_info')
var Heat = require('./heat')
var DamageMeter = require('./damage_meter')
var Cooldown = require('./cooldown')
var EventLog = require('./event_log')
var DPSMeter = require('./dps_meter')

var Info = React.createClass({

  render: function(){
    return <info>
      <h1>Info</h1>
      <info_wrapper>
        <Heat className='info'/>
        <Cooldown className='info'/>
        <DamageMeter />
        <DPSMeter />
        <MapInfo />
        <EventLog/>
      </info_wrapper>
    </info>
  }
})

module.exports = Info;

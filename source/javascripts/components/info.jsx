var MapInfo = require('./map_info')
var CurrentHeat = require('./heat/current');
var DamageMeter = require('./damage_meter')

var Info = React.createClass({
  styles: {
    flex: '1 0 0',
    paddingLeft: '10px'
  },

  render: function(){
    return <info style={this.styles}>
      <h1>Info</h1>
      <CurrentHeat/>
      <DamageMeter />

      <div>Total damage : 0</div>
      <div>DPS (elapsed time) : 0 (2m3s)</div>
      <MapInfo />
    </info>
  }
})

module.exports = Info;

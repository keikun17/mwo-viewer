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
      <MapInfo />
    </info>
  }
})

module.exports = Info;

var Info = require('./info');
var Equipment = require('./equipment');

var Mech = React.createClass({
  styles: {
    display: 'flex',
    flex: '3 0 0',
  },

  render: function(){
    return <mech style={this.styles}>
      <Info/>
      <Equipment/>
    </mech>
  }
})

module.exports = Mech;

var Info = React.createClass({
  styles: {
    flex: '1 0 0',
    border: '1px solid blue'

  },
  render: function(){
    return <info style={this.styles}>
      Mech stats and info go here
      <div>Current Heat / Threshold : 30/100</div>
      <div>Cooling time (cooling rate) : 10s (3/s)</div>
      <div>Ghost heat total</div>
      <div>Ghost heat of previous shot</div>
      <div>Total damage : 0</div>
      <div>DPS (elapsed time) : 0 (2m3s)</div>
      <div>Map : Terra Therma (-2s coolrate, -10 heat capacity)</div>
    </info>
  }
})

var Mech = React.createClass({
  styles: {
    display: 'flex',
    flex: '3 0 0',
    border: '1px solid black'
  },

  render: function(){
    return <mech style={this.styles}>
      <Info/>
      <Equipment/>
    </mech>
  }
})

var Equipment = React.createClass({
  styles: {
    paddingLeft: '10px',
    flex: '1 0 0',
  },
  render: function(){
    return <equipments style={this.styles}>
      <h1>Equipments</h1>
      <div className="equipment">
        <label>Internal Heatsinks</label>
        <input type="number" value="10"/>
      </div>
      <div>
        <label>External Heatsinks</label>
        <input type="number" value="0"/>
      </div>
    </equipments>
  }
})

module.exports  = Equipment;

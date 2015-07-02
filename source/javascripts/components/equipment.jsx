var Equipment = React.createClass({
  styles: {
    flex: '1 0 0',
    border: '1px solid purple'
  },
  render: function(){
    return <equipments style={this.styles}>
      Equipments go here
      <div>
        Internal Heatsinks <input type="number" value="10"/>
      </div>
      <div>
        External Heatsinks <input type="number" value="0"/>
      </div>

    </equipments>
  }
})

module.exports  = Equipment;

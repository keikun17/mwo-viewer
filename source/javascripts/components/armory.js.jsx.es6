var Armory = React.createClass({

  styles: {
    flex: '1 0 0',
    border: '1px solid black'

  },

  render: function(){
    var weapons = this.props.weapons_list.map(function(weapon, index, weapons_list){
      return <Weapon weapon={weapon}/>
    });

    return <armory style={this.styles}>
      <h1>
        Armory
      </h1>
      {weapons}
      </armory>
  }
});

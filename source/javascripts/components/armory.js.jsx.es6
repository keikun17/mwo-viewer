var Armory = React.createClass({

  render: function(){
    var weapons = this.props.weapons_list.map(function(weapon, index, weapons_list){
      return <Weapon weapon={weapon}/>
    });

    return <armory>
      <h1>
        Armory
      </h1>
      {weapons}
      </armory>
  }
});


var weapons_list = {
  [


  ]
};

var Armory = React.createClass({


  render: function(){
    var weapons = this.props.weapons_list.map(function(weapon, index, weapons_list){ 
      return <Weapon weapon={weapon}/>
    }),

    return <armory>{weapons}</armory>
  }
});

var Weapon = React.createClass({
  render: function(){
    return <weapon>{this.props.name}</weapon>
  }
});

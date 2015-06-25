var weapons_list = [
  {id: 123, name: 'Small Laser'}
] ;

var Armory = React.createClass({

  render: function(){
    var weapons = this.props.weapons_list.map(function(weapon, index, weapons_list){
      return <Weapon weapon={weapon}/>
    });

    return <armory>{weapons}</armory>
  }
});

var Weapon = React.createClass({
  styles: {
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: '#e67e22',
    padding: '10px 55px'
  },

  render: function(){
    return <weapon style={this.styles}>{this.props.weapon.name}</weapon>
  }
});


var app = document.getElementById('app');

var run = function(){
  React.render(<Armory weapons_list={weapons_list}/>, app);

};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}

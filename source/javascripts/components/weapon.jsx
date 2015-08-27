var React = require('react');
var WeaponActions = require('./actions/weapon_actions')

var Weapon = React.createClass({

  render: function(){
      switch(this.props.weapon.type) {
        case 'mis':
          var weapon_class = 'missile'
          break
        case 'las':
          var weapon_class = 'laser'
          break
        case 'bal':
          var weapon_class = 'ballistic'
          break
      }

      console.log(weapon_class)
    return <weapon onClick={this._onClick} className={weapon_class}>{this.props.weapon.name}</weapon>
  },

  _onClick: function(){
    WeaponActions.equip(this)
  },

});

module.exports = Weapon

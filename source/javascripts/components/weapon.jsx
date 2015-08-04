var React = require('react');
var WeaponActions = require('./actions/weapon_actions')

var Weapon = React.createClass({

  render: function(){
    return <weapon onClick={this._onClick}>{this.props.weapon.name}</weapon>
  },

  _onClick: function(){
    WeaponActions.equip(this)
  },

});

module.exports = Weapon

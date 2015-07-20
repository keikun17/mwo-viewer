var React = require('react');
var WeaponActions = require('./actions/weapon_actions')

var Weapon = React.createClass({

  styles: {
    display: 'block',
    border: "1px solid #e67e22",
    borderRadius: '4px',
    color: '#e67e22',
    cursor: 'pointer',
    // backgroundColor: 'transparent',
    // fontFamily: "'Open Sans Condensed', sans-serif",
    fontFamily: "'Roboto', sans-serif",
    padding: '10px 5px',
    marginTop: '3px',
    minWidth: '100px',
    maxWidth: '150px',
    textAlign: 'center'
  },

  render: function(){
    return <weapon style={this.styles} onClick={this._onClick}>{this.props.weapon.name}</weapon>
  },

  _onClick: function(){
    WeaponActions.equip(this)
  }

});

module.exports = Weapon

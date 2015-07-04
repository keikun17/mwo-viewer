
var Weapon = React.createClass({
  styles: {
    display: 'block',
    borderRadius: '4px',
    backgroundColor: '#e67e22',
    padding: '10px 5px',
    marginTop: '3px',
    width: '200px',
    textAlign: 'center'
  },

  render: function(){
    return <weapon style={this.styles}>{this.props.weapon.name}</weapon>
  }
});

module.exports = Weapon

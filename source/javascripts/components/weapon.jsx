
var Weapon = React.createClass({

  styles: {
    display: 'block',
    border: "1px solid #e67e22",
    borderRadius: '4px',
    color: '#e67e22',
    cursor: 'pointer',
    // backgroundColor: 'transparent',
    padding: '10px 5px',
    marginTop: '3px',
    minWidth: '100px',
    maxWidth: '150px',
    textAlign: 'center'
  },

  render: function(){
    return <weapon style={this.styles}>{this.props.weapon.name}</weapon>
  }
});

module.exports = Weapon


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

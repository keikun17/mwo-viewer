var React = require('react');
var Mech = require('./mech');
var Armory = require('./armory');
var weapons_list = require('./weapons_list');

class MechViewer extends React.Component {

  getStyle() {
    return {
      // display: '-webkit-flex',
      display: 'flex',
      flexDirection: 'row',
      // WebkitFlexDirection: 'row'
    }
  }

  render() {
    return <mechviewer style={this.getStyle()}>
      <Mech/>
      <Armory weapons_list={weapons_list}/>
    </mechviewer>
  }
}

export default MechViewer
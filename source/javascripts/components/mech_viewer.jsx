var React = require('react');
var Mech = require('./mech');
var Armory = require('./armory');
var weapons_list = require('./weapons_list');

var MechViewer = React.createClass({

  //
  // styles: Stylesheet.create({
  //   display: 'flex'
  // }),

  styles: {
    // display: '-webkit-flex',
    display: 'flex',
    flexDirection: 'row',
    // WebkitFlexDirection: 'row'

  },

  render: function(){
    return <mechviewer style={this.styles}>
      <Mech/>
      <Armory weapons_list={weapons_list}/>
    </mechviewer>
  }

})

module.exports = MechViewer;

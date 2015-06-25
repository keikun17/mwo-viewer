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

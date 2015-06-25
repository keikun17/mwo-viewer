var MechViewer = React.createClass({

  render: function(){
    return <mechviewer>
      <Mech/>
      <Armory weapons_list={weapons_list}/>
    </mechviewer>
  }

})

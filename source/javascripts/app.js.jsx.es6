//= require components/weapons_list
//= require components/mech_viewer
//= require components/armory
//= require components/weapon
//= require components/mech


var mountnode = document.getElementById('app');


var run = function(){
  React.render(
    <MechViewer>
      <Mech/>
      <Armory weapons_list={weapons_list}/>
    </MechViewer>, mountnode
  );

};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}

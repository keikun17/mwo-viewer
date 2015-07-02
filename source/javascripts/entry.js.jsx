var something = require('./components/something.js');
var Weapon = require('./components/weapon');
var weapons_list = require('./components/weapons_list');
var MechViewer = require('./components/mech_viewer');
var Armory = require('./components/armory');
var Mech = require('./components/mech');
var Info = require('./components/info');
var Equipment = require('./components/equipment');

console.log(something)

var mountnode = document.getElementById('app');


var run = function(){
  React.render(
    <MechViewer>
    </MechViewer>, mountnode
  );

};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}

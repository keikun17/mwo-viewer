var React = require('react');
var Weapon = require('./components/weapon');
var MechViewer = require('./components/mech_viewer');
var Info = require('./components/info');
var Equipment = require('./components/equipment');

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

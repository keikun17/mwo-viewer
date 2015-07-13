var React = require('react');
var MechViewer = require('./components/mech_viewer');

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

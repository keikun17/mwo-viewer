var something = require('./components/something.js')
var Weapon = require('./components/weapon')

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

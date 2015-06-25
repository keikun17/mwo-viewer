//= require components/weapons_list
//= require components/armory
//= require components/weapon


var mountnode = document.getElementById('app');


var run = function(){
  React.render(<Armory weapons_list={weapons_list}/>, mountnode);

};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}

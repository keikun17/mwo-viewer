console.log("called from inside app.js");
import Weapon from 'components/weapon';

(function() {
  console.log("rendering inside app.js");
  React.render(<Weapon name='Small Laser'/>, document.getElementById('app'));
}());

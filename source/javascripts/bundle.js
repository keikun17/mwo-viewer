/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var something = __webpack_require__(1);
	var Weapon = __webpack_require__(2);
	var weapons_list = __webpack_require__(3);
	var MechViewer = __webpack_require__(4);
	var Armory = __webpack_require__(5);
	var Mech = __webpack_require__(6);
	var Info = __webpack_require__(7);

	console.log(something);

	var mountnode = document.getElementById('app');

	var run = function run() {
	  React.render(React.createElement(MechViewer, null), mountnode);
	};

	if (window.addEventListener) {
	  window.addEventListener('DOMContentLoaded', run);
	} else {
	  window.attachEvent('onload', run);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	module.exports = "Som,etjhing";

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var Weapon = React.createClass({
	  displayName: 'Weapon',

	  styles: {
	    display: 'inline-block',
	    borderRadius: '4px',
	    backgroundColor: '#e67e22',
	    padding: '10px 5px',
	    marginTop: '3px',
	    width: '200px',
	    textAlign: 'center'
	  },

	  render: function render() {
	    return React.createElement(
	      'weapon',
	      { style: this.styles },
	      this.props.weapon.name
	    );
	  }
	});

	module.exports = Weapon;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var weapons_list = [{ id: 123, name: 'Small Laser' }, { id: 123, name: 'Medium Laser' }, { id: 123, name: 'Large Laser' }, { id: 123, name: 'Large Pulse Laser' }, { id: 123, name: 'Clan ER Large Laser' }];

	module.exports = weapons_list;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var MechViewer = React.createClass({
	  displayName: 'MechViewer',

	  //
	  // styles: Stylesheet.create({
	  //   display: 'flex'
	  // }),

	  styles: {
	    // display: '-webkit-flex',
	    display: 'flex',
	    flexDirection: 'row'
	  },

	  render: function render() {
	    return React.createElement(
	      'mechviewer',
	      { style: this.styles },
	      React.createElement(Mech, null),
	      React.createElement(Armory, { weapons_list: weapons_list })
	    );
	  }

	});

	module.exports = MechViewer;
	// WebkitFlexDirection: 'row'

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var Armory = React.createClass({
	  displayName: 'Armory',

	  styles: {
	    flex: '1 0 0',
	    border: '1px solid black'

	  },

	  render: function render() {
	    var weapons = this.props.weapons_list.map(function (weapon, index, weapons_list) {
	      return React.createElement(Weapon, { weapon: weapon });
	    });

	    return React.createElement(
	      'armory',
	      { style: this.styles },
	      React.createElement(
	        'h1',
	        null,
	        'Armory'
	      ),
	      weapons
	    );
	  }
	});

	module.exports = Armory;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var Mech = React.createClass({
	  displayName: 'Mech',

	  styles: {
	    display: 'flex',
	    flex: '3 0 0',
	    border: '1px solid black'
	  },

	  render: function render() {
	    return React.createElement(
	      'mech',
	      { style: this.styles },
	      React.createElement(Info, null),
	      React.createElement(Equipment, null)
	    );
	  }
	});

	module.exports = Mech;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var Info = React.createClass({
	  displayName: 'Info',

	  styles: {
	    flex: '1 0 0',
	    border: '1px solid blue'

	  },
	  render: function render() {
	    return React.createElement(
	      'info',
	      { style: this.styles },
	      'Mech stats and info go here',
	      React.createElement(
	        'div',
	        null,
	        'Current Heat / Threshold : 30/100'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'Cooling time (cooling rate) : 10s (3/s)'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'Ghost heat total'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'Ghost heat of previous shot'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'Total damage : 0'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'DPS (elapsed time) : 0 (2m3s)'
	      ),
	      React.createElement(
	        'div',
	        null,
	        'Map : Terra Therma (-2s coolrate, -10 heat capacity)'
	      )
	    );
	  }
	});

	module.exports = Info;

/***/ }
/******/ ]);
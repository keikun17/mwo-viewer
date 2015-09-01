var React = require('react');

var MapInfo = React.createClass({
  render: function(){
    return <div>
      Map <select type="text">
        <option> Terra Therma (-2s coolrate, -10 heat capacity) </option>
      </select>
    </div>
  }
})

module.exports = MapInfo;

var React = require('react');
class Cooldown extends React.Component {
  constructor(props) {
    super(props);

    // override the state unique to the class here
    this.state = {
      time_to_zero: 10,
      cool_rate: 4.2,
    };
  }

  getStyle(){
    return {
      display: 'inline-block'
    }
  }

  render() {
    return (
      <cooldown style={this.getStyle()}>
        <div className="info">
          <span className="info-title">Cooldown</span>
          <span className="info-value">{this.state.time_to_zero}s</span>
          <span className="info-value-divider">/</span>
          <span className="info-value">{this.state.cool_rate}</span>
          <span className="info-label">Time / Rate</span>
        </div>
      </cooldown>
    );
  }
}


export default Cooldown;

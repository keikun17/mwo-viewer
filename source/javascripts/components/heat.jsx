var React = require('react');

class CurrentHeat extends React.Component {
  constructor(props) {
    super(props);

    // override the state unique to the class here
    this.state = {
      value: 42,
      capacity: 100,
      ghost_heat_previous: 20,
      ghost_heat_total: 130

    };
  }

  getStyle(){
    return {
      display: 'inline-block'
    }
  }

  render() {
    return (
      <current_heat style={this.getStyle()}>

        <div className="info">
          <span className="info-title">Heat</span>
          <span className="info-value">{this.state.value}</span>
          <span className="info-value-divider">/</span>
          <span className="info-value">{this.state.capacity}</span>
          <span className="info-label">Current / Capacity</span>
        </div>


        <div className="info">
          <span className="info-title">Ghost Heat</span>
          <span className="info-value">{this.state.ghost_heat_previous}</span>
          <span className="info-value-divider">/</span>
          <span className="info-value">{this.state.ghost_heat_total}</span>
          <span className="info-label">Previous / Total</span>
        </div>

      </current_heat>

    );
  }
}


export default CurrentHeat;
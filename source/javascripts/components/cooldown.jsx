var React = require('react');
import HeatsinkStore from "./stores/heatsink_store"

class Cooldown extends React.Component {
  constructor(props) {
    super(props);

    // override the state unique to the class here
    this.state = {
      time_to_zero: 10,
      cool_rate: 4.2,
    };
  }

  componentDidMount(){
    this.store_data = HeatsinkStore.get_new_data()
    HeatsinkStore.addChangeListener(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    var time_to_zero = 0
    var cool_date = 0
    var internal_heatsink_cooldown_modifier = 0
    var external_heatsink_cooldown_modifier = 0

    if(this.store_data.double_heatsinks) {
      internal_heatsink_cooldown_modifier = .2
      external_heatsink_cooldown_modifier = .14
    } else {
      internal_heatsink_cooldown_modifier = .1
      external_heatsink_cooldown_modifier = .1
    }

    var internal_cooldown = (internal_heatsink_cooldown_modifier * this.store_data.internal_heatsinks)
    var external_cooldown = (external_heatsink_cooldown_modifier * this.store_data.external_heatsinks)

    var time_to_zero = 66
    var cool_rate = internal_cooldown + external_cooldown

    this.setState({
      time_to_zero: time_to_zero,
      cool_rate: cool_rate
    })
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

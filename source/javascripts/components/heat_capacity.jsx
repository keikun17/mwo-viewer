var React = require('react');
import HeatsinkStore from "./stores/heatsink_store"

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

  componentDidMount() {
    this.store_data = HeatsinkStore.get_new_data()
    HeatsinkStore.addChangeListener(this.onStoreChange.bind(this))
    console.log("heatsinks are")
    console.log(this.store_data.heatsinks)
  }

  onStoreChange() {


    // All mechs require a minimum 10 heat sinks to function
    // Engines come with 1 HS built in for every 25 rating up to the 250 engines
    // Standard or XL engine has no impact on this
    // All rates of Dissipation are given per second
    // Single Heat Sink [SHS] are worth 0.10 Dissipation each
    // [SHS] are worth 1.00 extra Heat Capacity each
    // Double Heat Sinks [DHS] are worth 0.14 to 0.20 dissipation each
    // [DHS] are worth 1.40 to 2.00 extra heat capacity
    // Internal [DHS] are worth 0.20 dissipation and 2.00 capacity
    // Internal [HS] are the ones built into the Engine
    // Visible [DHS] are worth 0.14 dissipation and 1.40 capacity
    // Any [DHS] manually added to the engine count as Visible

    var base_capacity = 30
    var internal_heatsink_capacity_modifier = 0
    var external_heatsink_capacity_modifier = 0

    if(this.store_data.double_heatsinks) {
      internal_heatsink_capacity_modifier = 2
      external_heatsink_capacity_modifier = 1.4
    } else {
      internal_heatsink_capacity_modifier = 1
      external_heatsink_capacity_modifier = 1
    }

    var internal_capacity = this.store_data.internal_heatsinks * internal_heatsink_capacity_modifier
    var external_capacity = this.store_data.external_heatsinks * external_heatsink_capacity_modifier

    var capacity = base_capacity + internal_capacity + external_capacity
    console.log("CAPACITY IS #{capacity}")

    this.setState({
      value: 66,
      capacity: capacity,
      ghost_heat_previous: 333,
      ghost_heat_total: 444
    })
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

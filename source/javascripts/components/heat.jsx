var React = require('react');
import HeatsinkStore from "./stores/heatsink_store"
import HeatStore from "./stores/heat_store"
import HeatActions from './actions/heat_actions'
import MapStore from './stores/map_store'
import MapConstants from "./constants/map_constants"
import CooldownStore from './stores/cooldown_store'
import Gauge from './gauge'

class CurrentHeat extends React.Component {

  constructor(props) {
    super(props);
    this.state = HeatStore.get_new_data()
  }

  componentDidMount() {
    this.store_data = HeatsinkStore.get_new_data()
    // this.calculate_capacity_and_draw()
    // HeatsinkStore.addChangeListener(this.calculate_capacity_and_draw.bind(this))
    HeatStore.addChangeListener(this.update_heat.bind(this))
    // MapStore.on(MapConstants.MAP_CHANGED, HeatActions.update_capacity)
    HeatActions.update_capacity()
    this.update_heat()

    this.cooling_cycle = setInterval(this.release_heat.bind(this), 100)
  }


  componentWillUnmount() {
    clearInterval(this.cooling_cycle)
  }

  update_heat() {
    this.setState(HeatStore.get_new_data())
  }

  release_heat() {
    if(this.state.value > 0){
      var amount = CooldownStore.get_new_data().cool_rate / 10
      HeatActions.release_heat(amount);
    }
  }

  gauge_level() {
    var level = this.state.value / this.state.capacity
    level = level * 100
    return level
  }

  render() {
    return (
      <current_heat className="info_item">
        <div className="title">Heat</div>


        <div className="readings">
          <div className="reading left">
            {this.state.value.toFixed(2)}
            <span className="label">Current</span>
          </div>

          <div className="divider">:</div>

          <div className="reading right">
            {this.state.capacity.toFixed(2)}
            <span className="label">Capacity</span>
          </div>

        </div>

        <Gauge gauge_level={this.gauge_level()} color="red" html="Reset" >
        </Gauge>
      </current_heat>
    );
  }
}


export default CurrentHeat;

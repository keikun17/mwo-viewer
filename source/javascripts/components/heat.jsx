var React = require('react');
import HeatsinkStore from "./stores/heatsink_store"
import HeatStore from "./stores/heat_store"
import HeatActions from './actions/heat_actions'
import CooldownStore from './stores/cooldown_store'

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

  render() {
    return (
      <div>
      <current_heat className="info">
          <span className="info-title">Heat</span>
          <span className="info-value">{this.state.value.toFixed(2)}</span>
          <span className="info-value-divider">|</span>
          <span className="info-value">{this.state.capacity}</span>
          <span className="info-label">Current / Capacity</span>
      </current_heat>

      <x_cont>
        <div className="info_item left">
          {this.state.value.toFixed(2)}
          <span className="label">Current</span>
        </div>

        <x_div>/</x_div>

        <div className="info_item right">
          {this.state.capacity.toFixed(2)}
          <span className="label">Capacity</span>
        </div>
      </x_cont>
    </div>


    );
  }
}


export default CurrentHeat;

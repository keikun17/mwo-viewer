var React = require('react');
import HeatsinkAction from './actions/heatsink_actions';
import AppDispatcher from './app_dispatcher';
import HeatsinkStore from './stores/heatsink_store';
import HeatActions from './actions/heat_actions'
import CooldownActions from './actions/cooldown_actions'

class Heatsink extends React.Component {
  constructor(props) {
    super(props)

    this.store_data = HeatsinkStore.get_new_data()
    this.state = {
      internal_heatsinks: this.store_data.internal_heatsinks,
      external_heatsinks: this.store_data.external_heatsinks,
      double_heatsinks: this.store_data.heatsink_type
    }
  }

  componentDidMount() {
    HeatsinkStore.addChangeListener(this.onStoreChange.bind(this))
  }

  onStoreChange(){
    this.setState(HeatsinkStore.get_new_data())
  }

  render() {
    return (
      <heatsink>
        <internal_heatsink>
          <div className="equipment">
            <label>Double Heatsinks</label>
            <input type="checkbox"
              ref="double_heatsinks"
              value={this.state.double_heatsinks}
              onChange={this._onHeatsinkTypeChange.bind(this)}
            />
          </div>
        </internal_heatsink>

        <internal_heatsink>
          <div className="equipment">
            <label>Internal Heatsinks</label>
            <input type="number"
              ref="internal_heatsinks"
              value={this.state.internal_heatsinks}
              onChange={this._onInternalChange.bind(this)}
            />
          </div>
        </internal_heatsink>

        <external_heatsink>
          <div className="equipment">
            <label>External Heatsinks</label>
            <input type="number"
              ref="external_heatsinks"
              value={this.state.external_heatsinks}
              onChange={this._onExternalChange.bind(this)}
            />
          </div>
        </external_heatsink>
      </heatsink>
    )
  }

  _onHeatsinkTypeChange(event) {
    this.store_toggle_heatsink_type()
    HeatActions.update_capacity()

  }

  _onInternalChange(event) {
    console.log("--- START ----")
    console.log("Step 1. I am in the heatsink component. Detected input field change")

    this.store_update_heatsink_count('internal_heatsinks', this.refs.internal_heatsinks.value)
    HeatActions.update_capacity()

  }

  _onExternalChange(event) {
    console.log("--- START ----")
    console.log("Step 1. I am in the heatsink component. Detected input field change")

    this.store_update_heatsink_count('external_heatsinks', this.refs.external_heatsinks.value)
    HeatActions.update_capacity()

  }

  store_toggle_heatsink_type() {
    HeatsinkAction.toggle_heatsink_type();
    CooldownActions.update_store()
  }

  store_update_heatsink_count(heatsink_location, amount) {
    var new_data = {}
    new_data.heatsink_location = heatsink_location
    new_data.amount = amount
    HeatsinkAction.update_heatsink_count(new_data);
  }

}

// Heatsink.propTypes = {
//   internal_heatsinks: React.PropTypes.integer
// }

export default Heatsink

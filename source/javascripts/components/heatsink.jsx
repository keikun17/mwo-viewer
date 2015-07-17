var React = require('react');
import HeatsinkAction from './actions/heatsink_actions';
import AppDispatcher from './app_dispatcher';
import HeatsinkStore from './stores/heatsink_store';

class Heatsink extends React.Component {
  constructor(props) {
    super(props)

    this.store_data = HeatsinkStore.getHeatsinkCount()
    this.state = {
      internal_heatsinks: this.store_data.internal_heatsinks,
      external_heatsinks: this.store_data.external_heatsinks
    }
  }

  componentDidMount() {
    HeatsinkStore.addChangeListener(this.onStoreChange.bind(this))
  }

  onStoreChange(){
    this.setState(HeatsinkStore.getHeatsinkCount())
  }

  render() {
    return (
      <heatsink>
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

  _onInternalChange(event) {
    console.log("--- START ----")
    console.log("Step 1. I am in the heatsink component. Detected input field change")
    console.log("value is")
    console.log(event.target.value)

    this.store_update_heatsink_count('internal_heatsinks', event.target.value)

  }

  _onExternalChange(event) {
    console.log("--- START ----")
    console.log("Step 1. I am in the heatsink component. Detected input field change")
    console.log("value is")
    console.log(event.target.value)

    this.store_update_heatsink_count('external_heatsinks', event.target.value)

  }

  store_update_heatsink_count(heatsink_location, amount) {
    var payload = {}
    payload.heatsink_location = heatsink_location
    payload.amount = amount
    HeatsinkAction.update_heatsink_count(payload);
  }

}

Heatsink.propTypes = {
  internal_heatsinks: React.PropTypes.integer
}

export default Heatsink

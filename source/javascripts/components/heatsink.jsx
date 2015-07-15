var React = require('react');
import HeatsinkAction from './actions/heatsink_actions';
import AppDispatcher from './app_dispatcher';
import HeatsinkStore from './stores/heatsink_store';

class Heatsink extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      internal_heatsinks: this.props.internal_heatsinks || 8,
      external_heatsinks: this.props.external_heatsinks || 5
    }
  }

  render() {
    return (
      <heatsink>
        <internal_heatsink>
          <div className="equipment">
            <label>Internal Heatsinks</label>
            <input type="number"
              onChange={this._onChange.bind(this)}
            />
          </div>
        </internal_heatsink>

        <external_heatsink>
          <div className="equipment">
            <label>External Heatsinks</label>
          </div>
        </external_heatsink>
      </heatsink>
    )
  }

  _onChange(event) {
    console.log("--- START ----")
    console.log("Step 1. I am in the heatsink component. Detected input field change")
    console.log("The current state is:")
    console.log(this.state)

    HeatsinkAction.update_count({
      internal_heatsinks: this.state.internal_heatsinks,
      external_heatsinks: this.state.external_heatsinks
    });
  }
}


export default Heatsink

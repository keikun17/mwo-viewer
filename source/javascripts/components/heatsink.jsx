var React = require('react');
import HeatsinkAction from './actions/heatsink_actions';
import AppDispatcher from './app_dispatcher';
import HeatsinkStore from './stores/heatsink_store';

class Heatsink extends React.Component {
  constructor(props) {
    super(props)

    this.store = HeatsinkStore.getHeatsinkCount()
    this.state = {
      internal_heatsinks: this.store.internal_heatsinks,
      external_heatsinks: this.store.external_heatsinks
    }
  }

  componentDidMount() {
    this.updateStore()
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
              onChange={this._onChange.bind(this)}
            />
          </div>
        </internal_heatsink>

        <external_heatsink>
          <div className="equipment">
            <label>External Heatsinks</label>
            <input type="number"
              ref="external_heatsinks"
              value={this.state.external_heatsinks}
              onChange={this._onChange.bind(this)}
            />
          </div>
        </external_heatsink>
      </heatsink>
    )
  }

  _onChange(event) {
    console.log("--- START ----")
    console.log("Step 1. I am in the heatsink component. Detected input field change")
    this.setState({
      internal_heatsinks: React.findDOMNode(this.refs.internal_heatsinks).value,
      external_heatsinks: React.findDOMNode(this.refs.external_heatsinks).value
    })

    this.updateStore()

  }

  updateStore() {
    HeatsinkAction.update_count({
      internal_heatsinks: this.state.internal_heatsinks,
      external_heatsinks: this.state.external_heatsinks
    });
  }

}

Heatsink.propTypes = {
  internal_heatsinks: React.PropTypes.integer
}

export default Heatsink

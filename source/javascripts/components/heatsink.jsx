var React = require('react');
import HeatsinkAction from './actions/heatsink_actions';
import AppDispatcher from './app_dispatcher';
import HeatsinkConstants from './constants/heatsink_constants';

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
    window.xevent = event;
    window.xthis = this;

    AppDispatcher.handleViewAction({
      internal_heatsinks: this.state.internal_heatsinks,
      external_heatsinks: this.state.external_heatsinks
    });

    // this.setState({ value: this.state.value })

    // console.log("ano gagawin")
  }
}


export default Heatsink

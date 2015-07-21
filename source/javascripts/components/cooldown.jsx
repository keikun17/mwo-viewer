var React = require('react');
import HeatsinkStore from "./stores/heatsink_store"
import CooldownStore from "./stores/cooldown_store"
import CooldownActions from "./actions/cooldown_actions"

class Cooldown extends React.Component {
  constructor(props) {
    super(props)

    // override the state unique to the class here
    //
    this.store_data = CooldownStore.get_new_data()
    this.state = this.store_data
  }

  componentDidMount() {
    CooldownStore.addChangeListener(this.onStoreChange.bind(this))
    CooldownActions.update_store()
  }

  onStoreChange() {
    this.setState(CooldownStore.get_new_data())
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

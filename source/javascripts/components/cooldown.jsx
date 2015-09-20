var React = require('react');
import HeatsinkStore from "./stores/heatsink_store"
import HeatStore from "./stores/heat_store"
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

  render() {
    return (
      <cooldown className="info_item">
        <div className="title">Cooldown</div>
        <div className="readings">
          <div className="reading left">
            {this.state.time_to_zero.toFixed(2)}
            <span className="label">Time(s)</span>
          </div>

          <div className="divider">@</div>

          <div className="reading right">
            {this.state.cool_rate.toFixed(2)}
            <span className="label">Rate(/s)</span>
          </div>
        </div>
      </cooldown>
    );
  }
}


export default Cooldown;

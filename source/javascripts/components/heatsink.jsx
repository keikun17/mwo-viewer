var React = require('react');
import HeatsinkStore from './stores/heatsink_store'
class Heatsink extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      internal_heatsinks: this.props.internal_heatsinks || 8,
      external_heatsinks: this.props.external_heatsinks || 5
    }
  }

  componentDidMount() {
    HeatsinkStore.addChangeListener(this._onChange)
  }


  render() {
    return (
      <heatsink>
        <internal_heatsink>
          <div className="equipment">
            <label>Internal Heatsinks</label>
            <input type="number"
              onChange={this._onChange}
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
    window.xevent = event
    window.xthis = this
    this.setState({ value: this.state.value })
    console.log("ano gagawin")
  }
}


export default Heatsink

var React = require('react');
class Heatsink extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      internal: 8,
      external: 5
    }
  }

  render() {
    return (
      <heatsink>
        <internal_heatsink>
          <div className="equipment">
            <label>Internal Heatsinks</label>
            <input type="number" value={this.state.internal}/>
          </div>
        </internal_heatsink>

        <external_heatsink>
          <div className="equipment">
            <label>Internal Heatsinks</label>
            <input type="number" value={this.state.external}/>
          </div>
        </external_heatsink>
      </heatsink>
    )

  }
}


export default Heatsink

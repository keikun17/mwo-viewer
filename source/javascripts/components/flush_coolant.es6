import React from "react"
import HeatActions from "./actions/heat_actions"

class FlushCoolant extends React.Component {

  _onClick() {
    HeatActions.reset_heat()
  }

  render() {
    return <flush_coolant onClick={this._onClick}>
      Reset
    </flush_coolant>
  }
}

export default FlushCoolant;

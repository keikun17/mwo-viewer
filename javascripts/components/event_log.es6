var React = require('react');
import GhostHeatGroupStore from './stores/ghost_heat_group_store'

export default class EventLog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: ["Mech loaded..."],
    }
  }

  componentDidMount() {
    GhostHeatGroupStore.on('ghost_heat_applied', this.append_content.bind(this))
  }


  append_content(message) {
    var messages = this.state.messages
    messages.push(<ghost_heat>{message}</ghost_heat>)
    this.setState({messages: messages})
  }

  render() {
    return <event_log> {this.state.messages} </event_log>
  }
}

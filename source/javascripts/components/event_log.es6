var React = require('react');
import GhostHeatGroupStore from './stores/ghost_heat_group_store'

export default class EventLog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {contents: "Mech loaded..."}
  }

  componentDidMount() {
    GhostHeatGroupStore.on('ghost_heat_applied', this.append_content.bind(this))
  }

  append_content(message) {
    var new_content = this.state.contents + "\n" + message
    this.setState({contents: new_content})
  }

  render() {
    var contents = this.state.contents
    return <textarea cols='80' rows="10" value={contents}/>
  }
}

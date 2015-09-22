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

  messages = []
  append_content(message) {
    var new_content = <p> message </p>
    messages.push(new_content)
    this.setState({contents: messages})
  }

  render() {
    var contents = this.state.contents

    return <textarea contenteditable='true' className='event-log' cols='80' rows="10" value={contents}/>
  }
}

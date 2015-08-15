var React = require('react');

export default class EventLog extends React.Component {
  render() {
    var contents = "Mech loaded\nYou can start equipping and firing weapons now"
    return <textarea cols='80'>
    {contents}
    </textarea>
  }
}

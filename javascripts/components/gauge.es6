var React = require('react');

export default class Gauge extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <gauge>
      <gauge_level style={{width: `${this.props.gauge_level}%`, backgroundColor: this.props.color}}/>
    </gauge>
  }

}

var React = require('react')
import WeaponActions from './actions/weapon_actions'

class GroupTrigger extends React.Component {
  constructor(props) {
    super(props)
  }

  group_fire(group_id) {
    WeaponActions.group_fire(group_id)
  }

  render() {
    return <weapon_group_trigger onClick={ this.group_fire.bind(this, this.props.group_id)}>
    {this.props.group_id}
    </weapon_group_trigger>
  }

}

export default GroupTrigger

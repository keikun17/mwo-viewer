var React = require('react')
import WeaponActions from './actions/weapon_actions'
import Keybindings from './stores/keybindings_store'
import KeybindingActions from './actions/keybinding_actions'

class GroupTrigger extends React.Component {
  constructor(props) {
    super(props)
  }

  group_fire(group_id) {
    WeaponActions.group_fire(group_id)
  }

  componentDidMount() {
    var mapping = this.group_fire.bind( this, this.props.group_id )

    KeybindingActions.assign(this.props.group_id, mapping )
  }

  render() {
    return <weapon_group_trigger onClick={ this.group_fire.bind(this, this.props.group_id)}>
    {this.props.group_id}
    </weapon_group_trigger>
  }

}

export default GroupTrigger

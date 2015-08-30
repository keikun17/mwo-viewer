import React from 'react'
import ArmoryActions from './actions/armory_actions'
import ArmoryStore from './stores/armory_store'


class FactionSelect extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
  }

  render() {

    return <faction_select>
      <faction className="innersphere">
        <input type="radio" name="weaponfilter"  onChange={this.onChange}/>
        Inner Sphere
      </faction>
      <faction className="clan">
        <input type="radio" name="weaponfilter" onChange={this.onChange} checked={this.props.show_clan}/>
        Clans
      </faction>
    </faction_select>
  }

  onChange() {
    ArmoryActions.toggle_list_faction()
  }

}


module.exports = FactionSelect

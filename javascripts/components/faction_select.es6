import React from 'react'
import ArmoryActions from './actions/armory_actions'
import ArmoryStore from './stores/armory_store'


class FactionSelect extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.show_clan_weapons = this.show_clan_weapons.bind(this)
    this.state = ArmoryStore.get_new_data()
  }

  show_clan_weapons() {
    return(this.state.selected_faction === 'clan')
  }

  componentDidMount() {
  }

  render() {

    return <faction_select>
      <faction className="innersphere">
        <input type="radio" name="weaponfilter"  onChange={this.onChange} checked={ !this.show_clan_weapons() }/>
        Inner Sphere
      </faction>
      <faction className="clan">
        <input type="radio" name="weaponfilter" onChange={this.onChange} checked={ this.show_clan_weapons() }/>
        Clans
      </faction>
    </faction_select>
  }

  onChange() {
    ArmoryActions.toggle_list_faction()
  }

}


module.exports = FactionSelect

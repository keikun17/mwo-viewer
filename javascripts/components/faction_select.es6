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
         <input id="is_select" type="radio" name="weaponfilter"  onChange={this.onChange} checked={ !this.show_clan_weapons() }/>
         <label className="innersphere" htmlFor="is_select">Inner Sphere </label>
      </faction>
      <faction className="clan">
        <input id="clan_select" type="radio" name="weaponfilter" onChange={this.onChange} checked={ this.show_clan_weapons() }/>
        <label className="clan" htmlFor="clan_select">Clans</label>
      </faction>
    </faction_select>
  }

  onChange() {
    ArmoryActions.toggle_list_faction()
  }

}


module.exports = FactionSelect

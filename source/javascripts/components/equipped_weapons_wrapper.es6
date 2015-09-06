import React from 'react'
import WeaponStore from "./stores/weapon_store"
import EquippedWeapon from "./equipped_weapon"

export default class EquippedWeaponsWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {equipped_weapons: []}
  }

  componentDidMount() {
    WeaponStore.addChangeListener(this.onStoreChange.bind(this))

  }

  onStoreChange() {
    this.setState({
      equipped_weapons: WeaponStore.get_new_data().equipped_weapons
    })
  }

  render() {
    var equipped_weapons = []
      for (var key in this.state.equipped_weapons){
      let _weapon = this.state.equipped_weapons[key]

      equipped_weapons.push(
        <EquippedWeapon id={key}
        key={key}
        name={_weapon.name}
        weapon_id={_weapon.weapon_id}
        cooldown_time={_weapon.cooldown_time}
        heat={_weapon.heat}
        damage={_weapon.damage}
        ghost_heat_group={_weapon.ghost_heat_group}
        ghost_limit={_weapon.ghost_limit}
        weapon_groups={_weapon.weapon_groups}
        is_disabled={_weapon.is_disabled}
        cooldown_time_remaining={_weapon.cooldown_time_remaining}
        type={_weapon.type}
        multiplier={_weapon.multiplier}
        />
      )
    }

    return <equipped_weapons>
    {equipped_weapons}
    </equipped_weapons>

  }
}



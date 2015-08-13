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
    var equipped_weapons = this.state.equipped_weapons.map(function(weapon ,index ,equipped_weapons){
      let _weapon = weapon

      return <EquippedWeapon id={index}
      key={index}
      name={_weapon.name}
      weapon_id={_weapon.weapon_id}
      cooldown_time={_weapon.cooldown_time}
      heat={_weapon.heat}
      damage={_weapon.damage}
      ghost_heat_group={_weapon.ghost_heat_group}
      ghost_limit={_weapon.ghost_limit}
      />
    })

    return <equipped_weapons>
    {equipped_weapons}
    </equipped_weapons>

  }
}



var React = require('react');
import DamageStore from './stores/damage_store'
import DamageActions from './actions/damage_actions'
import WeaponStore from './stores/weapon_store'
import WeaponConstants from './constants/weapon_constants'


class DPSMeter extends React.Component {
  constructor(props) {
    super(props)

    this.state = DamageStore.get_new_data()
  }


  onStoreChange() {
    this.setState(DamageStore.get_new_data())
  }

  render() {
    return(
      <damage_meter className="info_item">
        <div className="title">DPS</div>
      </damage_meter>
    )
  }

}


export default DPSMeter

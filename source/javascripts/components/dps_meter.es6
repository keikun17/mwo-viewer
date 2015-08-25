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
       <dps_meter className="info">
         <span className="info-title">DPS</span>
         <span className="info-value">{this.state.dps}</span>
         <span className="info-value-divider">/</span>
         <span className="info-value">{this.state.elapsed_time}s</span>
         <span className="info-label">DPS / Elapsed</span>
       </dps_meter>
    )
  }

}


export default DPSMeter

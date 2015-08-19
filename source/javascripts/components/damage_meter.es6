var React = require('react');
import DamageStore from './stores/damage_store'
import DamageActions from './actions/damage_actions'
import WeaponStore from './stores/weapon_store'
import WeaponConstants from './constants/weapon_constants'


class DamageMeter extends React.Component {
  constructor(props) {
    super(props)

    this.state = DamageStore.get_new_data()
  }


  getStyle(){
    return {
      display: 'flex'
    }
  }

  componentDidMount() {
    // Reset the damage counter to 0
    WeaponStore.on(WeaponConstants.WEAPON_WILL_GROUP_FIRE, () => {DamageActions.apply_damage(0)})
    DamageStore.addChangeListener(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(DamageStore.get_new_data())
  }

  render() {
    return(
     <damage_meter style={this.getStyle()}>

       <div className="info">
         <span className="info-title">Damage</span>
         <span className="info-value">{this.state.last}</span>
         <span className="info-value-divider">/</span>
         <span className="info-value">{this.state.total}</span>
         <span className="info-label">Previous / Total</span>
       </div>

       <div className="info">
         <span className="info-title">DPS</span>
         <span className="info-value">{this.state.dps}</span>
         <span className="info-value-divider">/</span>
         <span className="info-value">{this.state.elapsed_time}s</span>
         <span className="info-label">DPS / Elapsed</span>
       </div>

     </damage_meter>

    )
  }

}


export default DamageMeter

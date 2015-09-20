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
      <damage_meter className="info_item">
        <div className="title">Damage</div>
        <div className="readings">
          <div className="reading left">
            {+(this.state.last.toFixed(2))}
            <span className="label">Previous</span>
          </div>

          <div className="divider">@</div>

          <div className="reading right">
            {+(this.state.total.toFixed(2))}
            <span className="label">Total</span>
          </div>
        </div>
      </damage_meter>
    )
  }

}


export default DamageMeter

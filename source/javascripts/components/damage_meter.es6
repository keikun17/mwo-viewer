var React = require('react');
import DamageStore from './stores/damage_store'

class DamageMeter extends React.Component {
  constructor(props) {
    super(props)

    this.state = DamageStore.get_new_data()
  }


  getStyle(){
    return {
      display: 'inline-block'
    }
  }

  componentDidMount() {
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

var React = require('react');
class DamageMeter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      damage_previous: 12,
      damage_total: 120,
      dps: 21,
      elapsed_time: 55
    }
  }


  getStyle(){
    return {
      display: 'inline-block'
    }
  }

  render() {
    return(
     <damage_meter style={this.getStyle()}>

       <div className="info">
         <span className="info-title">Damage</span>
         <span className="info-value">{this.state.damage_previous}</span>
         <span className="info-value-divider">/</span>
         <span className="info-value">{this.state.damage_total}</span>
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

class CurrentHeat extends React.Component {
  constructor(props) {
    super(props);

    // override the state unique to the class here
    this.state = {};
  }

  getStyle(){
    return {
      textAlign: 'center'
    }
  }

  render() {
    return (
      <current_heat style={this.getStyle()}>
      <span className="info-value">32</span>
      <span className="info-label">Current Heat</span>
      </current_heat>
    );
  }
}


export default CurrentHeat;

export default class Weapon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: props.name};
  }

  render() {
    var weaponClass = 'weapon';
    return (
      <div className={weaponClass}>{this.state.name}</div>
    );
  }
}


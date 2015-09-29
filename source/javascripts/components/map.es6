import React from "react"
import MapStore from "./stores/map_store"
import MapActions from "./actions/map_actions"

export default class Map extends React.Component {

  constructor (arg) {
    // init
    super(arg)
  }


  render() {

    var game_maps = MapStore.get_new_data().game_maps
    var map_options = []

    for (var map_name in game_maps) {
      map_options.push(
        <option dissipation={game_maps[map_name].dissipation} capacity={game_maps[map_name].capacity}>
          {map_name}
        </option>
      )
    }

    return  <div className="input-group">
      <label>Map</label>
      <select ref="map_select" onChange={this.onChange.bind(this)} >
        {{map_options}}
      </select>
    </div>
  }

  onChange() {
    MapActions.change_map(this.refs.map_select.value)
  }

}


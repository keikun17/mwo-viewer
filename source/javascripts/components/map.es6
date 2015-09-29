import React from "react"
import MapStore from "./stores/map_store"
import MapActions from "./actions/map_actions"

export default class Map extends React.Component {

  constructor (arg) {
    // init
    super(arg)
  }


  render() {

    var game_maps = [
      {name: "Forest Colony"           , dissipation: 0    , capacity: 0}    ,
      {name: "Canyon Network"          , dissipation: 0    , capacity: 0}    ,
      {name: "River City"              , dissipation: 0    , capacity: 0}    ,
      {name: "Crimson Strait"          , dissipation: 0    , capacity: 0}    ,

      {name: "Forest Colony Snow"      , dissipation: .25  , capacity: .25}  ,
      {name: "Alpine Peaks"            , dissipation: .25  , capacity: .25}  ,
      {name: "Frozen City"             , dissipation: .25  , capacity: .25}  ,

      {name: "Caustic Valley"          , dissipation: -.15 , capacity: -.10} ,
      {name: "Terra Therma"            , dissipation: -.25 , capacity: -.20} ,
      {name: "Tourmaline Desert"       , dissipation: -.15 , capacity: -.10} ,

      {name: "Caustic Valley [Crater]" , dissipation: 0    , capacity: 0}    ,
      {name: "Terra Therma [Caldera]"  , dissipation: 0    , capacity: 0}    ,
    ]

    var map_options = []
    for (let game_map of game_maps) {
      map_options.push(<option dissipation={game_map.dissipation} capacity={game_map.capacity}>{game_map.name}</option>)
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


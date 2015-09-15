import React from 'react'
import ReactDOM from 'react-dom'
import ArmoryStore from './stores/armory_store'
import WeaponActions from './actions/weapon_actions'

export default class SmurfyScraper extends React.Component {

  constructor(props) {
    super(props)
    this.scrape = this.scrape.bind(this)
  }

  componentDidMount() {
  }

  scrape(e) {
    e.preventDefault()

    // In the mechlab tooltip, all the required HTML are loaded, whereas in the mechlab,
    // things gets loaded by JS
    var smurfy_url = ReactDOM.findDOMNode(this.refs.smurfy_urler).value
    smurfy_url = smurfy_url.replace('mwo.smurfy-net.de/mechlab#','mwo.smurfy-net.de/mechlab/loadouts')
    smurfy_url = smurfy_url.replace('i=', '/')
    smurfy_url = smurfy_url.replace('&l=', '/')

    var yql_url =  `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url=%27${smurfy_url}%27%20&format=json`

    var oReq= new XMLHttpRequest();

    var updateProgress = function() {
      // console.log("1")
    }
    var transferFailed = function() {
      // console.log("3")
    }
    var transferCanceled = function() {
      // console.log("4")
    }

    oReq.addEventListener("progress", updateProgress, false);
    oReq.addEventListener("load", this.transferComplete.bind(this), false);
    oReq.addEventListener("error", transferFailed, false);
    oReq.addEventListener("abort", transferCanceled, false);

    oReq.open("GET", yql_url, true)
    oReq.send()
  }


  transferComplete(data) {
    var responseText = JSON.parse(data.currentTarget.responseText)
    var result_body = JSON.parse(responseText.query.results.body)

    // console.log("Result body is ")
    // console.log(result_body)

    var configurations = result_body.configuration

    var item_ids = []

    for(let configuration of configurations) {
      for(let item of configuration.items) {
        if(item.type === "weapon")
          item_ids.push(item.id)
      }
    }


    // console.log("item ids are ")
    // console.log(item_ids)

    var factioned_weapons_list = ArmoryStore.get_new_data().weapons_list
    var weapons_list = factioned_weapons_list["innersphere"].concat(factioned_weapons_list["clan"])

    var weapons_to_equip = []
    for(let weapon_id of item_ids){
      weapons_to_equip.push(weapons_list.find( x => (x.weapon_id === weapon_id)))
    }

    // console.log("weapons to equip are")
    // console.log(weapons_to_equip)

    for(let weapon of weapons_to_equip) {
      if(typeof(weapon) === "object")
        WeaponActions.equip({props: {weapon: weapon}})
    }

  }

  render() {
    return (
      <smurfy_scraper>
      <form onSubmit={this.scrape}>
      <div className="input-group">
      <label htmlFor="smurfy_url">Import from Smurfy</label>
      <input id="smurfy_url" ref="smurfy_urler"/>
      </div>
      </form>
      </smurfy_scraper>
    )
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import ArmoryStore from './stores/armory_store'
import WeaponActions from './actions/weapon_actions'

export default class SmurfyScraper extends React.Component {

  constructor(props) {
    super(props)
    this.scrape = this.scrape.bind(this)
    this.state = {}
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

    oReq.addEventListener("progress", this.updateProgress.bind(this), false);
    oReq.addEventListener("error", this.transferFailed.bind(this), false);
    oReq.addEventListener("abort", this.transferCanceled.bind(this), false);
    oReq.addEventListener("load", this.transferComplete.bind(this), false);


    oReq.open("GET", yql_url, true)
    oReq.send()
  }


  updateProgress(data) {
    this.setState({className: 'loading'})
  }

  transferFailed(data) {
    this.setState({className: 'errored'})
  }

  transferCanceled() {
    console.log("transfer cancelled")
  }


  transferComplete(data) {
    var responseText = JSON.parse(data.currentTarget.responseText)
    try {
      var result_body = JSON.parse(responseText.query.results.body)
    } catch (err) {
      this.setState({className: 'errored'})
    }

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

    this.setState({className: 'loaded'})

  }

  render() {
    return (
      <smurfy_scraper>
      <form onSubmit={this.scrape}>
      <div className="input-group scraper_form">
      <label htmlFor="smurfy_url">Import from Smurfy</label>
      <div>
      <input placeholder="Paste Smurfy URL" className={this.state.className} id="smurfy_url" ref="smurfy_urler"/>
      </div>
      </div>
      </form>
      </smurfy_scraper>
    )
  }
}

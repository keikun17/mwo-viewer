import React from 'react'
export default class SmurfyScraper extends React.Component {

  constructor(props) {
    super(props)
    this.scrape = this.scrape.bind(this)
  }

  componentDidMount() {
  }

  scrape(e) {
    e.preventDefault()
    console.log("scrapin smurfy")

    // In the mechlab tooltip, all the required HTML are loaded, whereas in the mechlab,
    // things gets loaded by JS
    var smurfy_url = document.getElementById('smurfy_url').value
    smurfy_url = smurfy_url.replace('mwo.smurfy-net.de/mechlab#','mwo.smurfy-net.de/mechlab/loadouts')
    smurfy_url = smurfy_url.replace('i=', '/')
    smurfy_url = smurfy_url.replace('&l=', '/')

    var yql_url =  `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url=%27${smurfy_url}%27%20&format=json`

    var oReq= new XMLHttpRequest();

    var updateProgress = function() { console.log("1") }

    var transferComplete = function() {
      console.log("2")
      console.log(`response is`)
      var result_body = JSON.parse(this.responseText).query.results.body
      console.log(JSON.parse(result_body))
    }

    var transferFailed = function() { console.log("3") }

    var transferCanceled = function() { console.log("4") }

    oReq.addEventListener("progress", updateProgress, false);
    oReq.addEventListener("load", transferComplete, false);
    oReq.addEventListener("error", transferFailed, false);
    oReq.addEventListener("abort", transferCanceled, false);

    oReq.open("GET", yql_url, true)
    console.log(
      oReq.send()
    )
  }

  render() {
    return <smurfy_scraper>
    <form onSubmit={this.scrape}>
      <label htmlFor="smurfy_url">Import from Smurfy</label>
      <input id="smurfy_url"/>
    </form>
    </smurfy_scraper>
  }
}

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

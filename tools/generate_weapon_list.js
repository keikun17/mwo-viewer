var request = require("request")
var fs = require("fs")
var url = "http://static.mwomercs.com/api/items/list/full.json"


console.log("Connecting to " + url)

request(url, function(error, response, body ){
  if(!error){
    console.log("Parsing json")

    // JSON.parse(text[, reviver])
    var raw_json = JSON.parse(body)
    var timestamp = Date.now()
    var filename = `./weapon_list_${timestamp}.js`

    var json = {
      innersphere: [],
      clan: []
    }

    for(item_id in raw_json) {
      let item = raw_json[item_id]
      if( item.category != "weapons") {break}

      if(item.factions.InnerSphere == true) {
        var faction = 'innersphere'

      } else if (item.factions.Clan == true) {
        var faction = 'clan'
      }

      // for the ghost_limit property
      if(typeof(item.stats.minheatpenaltylevel) != 'undefined') {
        var ghost_limit = item.stats.minheatpenaltylevel - 1
      } else {
        var ghost_limit = 0
      }

      json[faction].push({
        weapon_id: item_id,
        ghost_limit: ghost_limit
        type: stats.typ

      })

      }
    }


    fs.writeFile(filename, JSON.stringify(json, null, 2), function(err){
      if(err){
        console.log("Error writing file")
      }
    })



    console.log("contents are" + json)

  } else {

    console.log("Error encountered " + error)
  }
})

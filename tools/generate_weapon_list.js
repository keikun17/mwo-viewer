"use strict"
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
    // var filename = `../source/javascripts/components/weapons_list_${timestamp}.js`
    var filename = `../source/javascripts/components/weapons_list.es6`

    var json = {
      innersphere: [],
      clan: []
    }

    // console.log(`raw json is ${JSON.stringify(raw_json)}`)

    for(var item_id in raw_json) {
      let item = raw_json[item_id]

      // Break conditions 
      //   Skip non weapons
      if( item.category != "weapon") { break }
      //   Skip factionless weapons
      if( typeof(item.factions) === 'undefined') {break}
      //   Skip non-damaging weapons
      if( item.stats.damage === 0) {break}

      if(item.factions.InnerSphere == true) {
        var faction = 'innersphere'

      } else if (item.factions.Clan == true) {
        var faction = 'clan'
      }

      // For weapon type property
      switch(item.stats.type){
        case "Ballistic":
          var weapon_type = 'bal'
        break
        case "Energy":
          var weapon_type = 'las'
        break
        case "Missile":
          var weapon_type = "mis"
        break
      }

      // for weapon ghost_limit property
      if(typeof(item.stats.minheatpenaltylevel) != 'undefined') {
        var ghost_limit = item.stats.minheatpenaltylevel - 1
      } else {
        var ghost_limit = 0
      }

      // for damage
      var damage = item.stats.damage * item.stats.numFiring

      // for ghost heat group

      console.log(item.stats.heatPenaltyID)
      if(typeof(item.stats.heatPenaltyID) != 'undefined') {
        var ghost_heat_group = item.stats.heatPenaltyID
      } else {
        var ghost_heat_group = item_id
      }

      console.log(`${faction} contents are currently`)
      console.log(json[faction])
      json[faction].push({
        weapon_id: item_id,
        ghost_limit: ghost_limit,
        type: weapon_type,
        name: item.name,
        cooldown_time: item.stats.cooldown,
        heat: item.stats.heat,
        damage: damage,
        ghost_heat_group: ghost_heat_group
      })

    }

    var content = `module.exports = ${JSON.stringify(json, null, 2)} `

    fs.writeFile(filename, content, function(err){
      if(err){
        console.log("Error writing file " + err)
      }
    })



    console.log("contents are " + json)

  } else {
    console.log("Error encountered " + error)
  }
})

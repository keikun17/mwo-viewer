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

    // Do not include these items
    var black_listed = ["1237", "1014"]


    // console.log(`raw json is ${JSON.stringify(raw_json)}`)

    for(var item_id in raw_json) {
      let item = raw_json[item_id]
      console.log(`processing item_id : ${item_id}`)

      // Break conditions
      // Skip blacklisted weapons
      if(black_listed.indexOf(item_id) != -1)
        continue
      //   Skip non weapons
      if(item.category != "weapon"){ continue }
      //   Skip factionless weapons
      if( typeof(item.factions) === 'undefined') { continue }
      //   Skip non-damaging weapons
      if( item.stats.damage === 0) { continue }

      if(item.factions.InnerSphere === true) {
        var faction = 'innersphere'

      } else if (item.factions.Clan === true) {
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

      if(typeof(item.stats.heatPenaltyID) != 'undefined') {
        var ghost_heat_group = item.stats.heatPenaltyID
      } else {
        var ghost_heat_group = item_id
      }

      json[faction].push({
        weapon_id: item_id,
        ghost_limit: ghost_limit,
        type: weapon_type,
        name: item.name,
        cooldown_time: item.stats.cooldown,
        heat: item.stats.heat,
        damage: damage,
        ghost_heat_group: ghost_heat_group,
        multiplier: item.stats.heatpenalty
      })

    }

    // Sort alphabetically
    var name_sorter =  function(a,b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }

    json.innersphere.sort(name_sorter)
    json.clan.sort(name_sorter)

    // Sort by weapon_type
    var weapon_type_sorter =  function(a,b) {
      if (a.type < b.type)
        return -1;
      if (a.type > b.type)
        return 1;
      return 0;
    }

    json.innersphere.sort(weapon_type_sorter)
    json.clan.sort(weapon_type_sorter)

    var content = `module.exports = ${JSON.stringify(json, null, 2)} `

    fs.writeFile(filename, content, function(err){
      if(err){
        console.log("Error writing file " + err)
      }
    })

    console.log("Done")

  } else {
    console.log("Error encountered " + error)
  }
})

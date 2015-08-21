var weapons_list = [
  {weapon_id: 123, ghost_limit: 0, name: 'Small Laser', cooldown_time: 2.25, heat: 3, damage: 3},
  {weapon_id: 123, ghost_limit: 6, name: 'Medium Laser', cooldown_time: 3, heat: 4, damage: 5, ghost_heat_group: 'mlas'},
  {weapon_id: 123, ghost_limit: 3, name: 'Large Laser', cooldown_time: 3.25, heat: 7, damage: 9, ghost_heat_group: 'llas'},
  {weapon_id: 123, ghost_limit: 3, name: 'Large Pulse Laser', cooldown_time: 3.25, heat: 7, damage: 11, ghost_heat_group: 'llas'},

  {weapon_id: 123, ghost_limit: 4, name: 'SRM 2',  cooldown_time: 2,   heat: 2, damage: 4,  ghost_heat_group: 'srm'},
  {weapon_id: 123, ghost_limit: 3, name: 'SRM 4',  cooldown_time: 3,   heat: 2, damage: 8,  ghost_heat_group: 'srm'},
  {weapon_id: 123, ghost_limit: 3, name: 'SRM 6',  cooldown_time: 4,   heat: 4, damage: 12, ghost_heat_group: 'srm'},

  {weapon_id: 123, ghost_limit: 3, name: 'LRM 5',  cooldown_time: 3.5, heat: 2, damage: 5,  ghost_heat_group: 'lrm'},
  {weapon_id: 123, ghost_limit: 2, name: 'LRM 10', cooldown_time: 4,   heat: 4, damage: 10, ghost_heat_group: 'lrm'},
  {weapon_id: 123, ghost_limit: 2, name: 'LRM 15', cooldown_time: 4.5, heat: 5, damage: 15, ghost_heat_group: 'lrm'},
  {weapon_id: 123, ghost_limit: 2, name: 'LRM 20', cooldown_time: 6,   heat: 6, damage: 20, ghost_heat_group: 'lrm'},

] ;

module.exports = weapons_list

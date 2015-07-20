import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import WeaponConstants from '../constants/weapon_constants'

var data = {
  equipped_weapons: []
}

class WeaponStore extends EventEmitter {

}


let _WeaponStore = new WeaponStore();
export default _WeaponStore

AppDispatcher.register((payload) => {
  var action_type = payload.action_type;
  switch(action_type) {
    case WeaponConstants.WEAPON_EQUIP:
      console.log("equipping weapon : ")
      console.log(payload.weapon)
      break
  }
})


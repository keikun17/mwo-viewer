import {EventEmitter} from 'events';
import AppDispatcher from '../app_dispatcher';
import WeaponConstants from '../constants/weapon_constants'

var CHANGE = 'WEAPON_UPDATED'

var data = {
  equipped_weapons: []
}

class WeaponStore extends EventEmitter {

  // move this to store base class
  get_new_data() {
    return data
  }

  // move this to store base class
  emitChange() {
    console.log("Dito ko sa emitchange sa loob ng heatsink_store")
    console.log("Final Step : Here, we update the heatsink info cooldown an capacity with the updated data : ")
    console.log(data)
    this.emit(CHANGE);
  }

  // move this to store base class
  addChangeListener(callback) {
    console.log("heatsink_store.addChangelistener called para pag may changes sa store, mapopropagate sa react components itong callback na to :")
    console.log(callback)
    this.on(CHANGE, callback);
  }

  // move this to store base class
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}


let _WeaponStore = new WeaponStore();
export default _WeaponStore

AppDispatcher.register((payload) => {
  var action_type = payload.action_type;
  switch(action_type) {
    case WeaponConstants.WEAPON_EQUIP:

      data.equipped_weapons.push(payload.weapon)

      _WeaponStore.emit(CHANGE)

      console.log("equipping weapon : ")
      console.log(payload.weapon)
      break
  }
})

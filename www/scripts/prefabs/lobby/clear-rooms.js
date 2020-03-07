import gui from '../../gui.js'
import roomService from '../../services/room.js'

let el

export default () => setTimeout(() => {
  if(el !== gui.grab('#clearRooms')){
    el = gui.grab('#clearRooms')
    el.addEventListener('click', () => roomService.clearRooms())
  }
}, 0)
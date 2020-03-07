import gui from '../../gui.js'
import roomService from '../../services/room.js'

let el

export default () => {
  if(el !== gui.grab('#clearRooms')){
    el = gui.grab('#clearRooms')
    let rooms = gui.grab('.rooms')

    el.addEventListener('click', () => {
      while(rooms.children.length > 1)
        rooms.removeChild(rooms.lastChild)
      roomService.clearRooms()
    })
  }
}
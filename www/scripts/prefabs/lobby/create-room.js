import gui from '../../gui.js'
import roomService from '../../services/room.js'

let el

export default () => {
  if(el !== gui.grab('#createRoom')){
    el = gui.grab('#createRoom')
    el.addEventListener('click', () => roomService.newRoom())
  }
}
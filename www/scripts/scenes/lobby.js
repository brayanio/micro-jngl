import gui from '../gui.js'
import RoomCard from '../prefabs/lobby/room-card.js'
import Micro from '../prefabs/lobby/micro.js'
import CreateRoom from '../prefabs/lobby/create-room.js'

import roomService from '../services/room.js'

let interval

export default {
  run: async (router) => {
    let container = gui.sprite({
      classList: ['lobby']
    })

    let rooms = await roomService.getOpenRooms()
    console.log(rooms)

    container.el.innerHTML = `
      <strong>Welcome to the</strong>
      <h1><small id="micro">Micro</small>JNGL</h1>
      <nav>
        <a href="#/cookbook">Cookbook</a>
      </nav>
      <div class="rooms">
        <strong>
          ${rooms.length > 0 ? `${rooms.length} Room(s)` : 'No Rooms Available'}
        </strong>
        <hr>
      </div>
      <button id="createRoom" class="lobby-menubtn">Create Room</button>
    `
    
    Micro(interval, 5, true)
    CreateRoom()

    if(rooms.length > 0){
      setTimeout(() => {
        let roomContainer = {el: gui.grab('.rooms')}

        let card
        let roomCards = rooms.map(r => RoomCard(r, roomContainer))
      }, 0)
    }

    document.body.appendChild(container.el)
  },
  clearnup: () => {
    clearInterval(interval)
  } 
}
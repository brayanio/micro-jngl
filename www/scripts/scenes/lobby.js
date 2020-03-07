import gui from '../gui.js'
import RoomCard from '../prefabs/lobby/room-card.js'
import Micro from '../prefabs/lobby/micro.js'
import CreateRoom from '../prefabs/lobby/create-room.js'
import ClearRooms from '../prefabs/lobby/clear-rooms.js'

import roomService from '../services/room.js'

let container, interval, newRoomInterval
export default {
  run: async (router) => {

    let rooms = await roomService.getOpenRooms()

    container = gui.sprite({
      classList: ['lobby'],
      template: `
        <strong>Welcome to the</strong>
        <h1><small id="micro">Micro</small>JNGL</h1>
        <nav>
          <a href="#/cookbook">Cookbook</a>
        </nav>
        <div class="rooms card">
          <strong>
            ${rooms.length > 0 ? `${rooms.length} Room(s)` : 'No Rooms Available'}
          </strong>
          <hr>
        </div>
        <button id="createRoom" class="lobby-menubtn">Create Room</button>
        <button id="clearRooms" class="lobby-menubtn">Clear Rooms</button>
      `,
      onload: [['.rooms'], ui => {
        Micro(interval, 5, true)
        CreateRoom()
        ClearRooms()

        if(rooms.length > 0){
          let roomContainer = { el: ui.rooms }
          let roomCards = rooms.map(r => RoomCard(r, roomContainer))
        }

        newRoomInterval = roomService.onNewRoom(r => {
            let roomContainer = { el: ui.rooms }
            RoomCard(r, roomContainer)
            rooms.push(r)
        })
      }],
      append: { el: document.body }
    })
  },
  cleanup: () => {
    document.body.removeChild(container.el)
    clearInterval(interval)
    roomService.onNewRoomCleanup(newRoomInterval)
  } 
}
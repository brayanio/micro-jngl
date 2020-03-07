import gui from '../gui.js'
import RoomCard from '../prefabs/lobby/room-card.js'
import Micro from '../prefabs/lobby/micro.js'
import CreateRoom from '../prefabs/lobby/create-room.js'
import ClearRooms from '../prefabs/lobby/clear-rooms.js'

import roomService from '../services/room.js'

let container, interval, newRoomInterval
export default {
  run: async () => {
    return container = gui.sprite({
      classList: ['lobby', 'drow'],
      template: `
        <div class="d3">
          <strong>Welcome to the</strong>
          <h1><small id="micro">Micro</small>JNGL</h1>
          <nav>
            <a href="#/cookbook">Cookbook</a>
          </nav>
          <hr>
          <div class="links">
            <button id="refresh" class="link">Refresh</button>
            <button id="createRoom" class="link">Create Room</button>
            <button id="clearRooms" class="link">Clear Rooms</button>
          </div>
          <hr>
        </div>
        <div class="d7">
          <div class="rooms card">
            <strong>No Rooms Available</strong>
            <hr>
          </div>
        </div>
      `,
      onload: [['.rooms', '#refresh', '#clearRooms'], ui => {
        Micro(interval, 5, true)
        CreateRoom()
        ClearRooms()

        let roomContainer = { el: ui.rooms }
        let roomCards = [], rooms = []

        ui.refresh.addEventListener('click', async () => {
          rooms = await roomService.getOpenRooms()  
          roomCards.forEach(card => card.remove())
          roomCards = rooms.map(r => RoomCard(r, roomContainer))
        })

        newRoomInterval = roomService.onNewRoom(r => {
            let roomContainer = { el: ui.rooms }
            RoomCard(r, roomContainer)
            rooms.push(r)
        })

        ui.refresh.click()
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
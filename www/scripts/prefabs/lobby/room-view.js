import nggt from '../../nggt.js'
import Room from '../../services/room.js'
import RoomCard from './room-card.js'
import Join from '../layout/join.js'

export default () => {
  let temp = `
    <strong>No Rooms Available</strong>
    <hr>
  `
  
  return nggt.create({
    template: `
      <div class="rooms card" id="container">
        ${temp}
      </div>
    `,
    run: async (ui, data) => {
      Room.service.openRooms.onChange(rooms => {
        let html = Join(temp, ...rooms.map(room => RoomCard(room)))
        ui.container.innerHTML = html
      })
      if(Room.service.openRooms.val().length === 0)
        Room.getOpenRooms()
    }
  })
}
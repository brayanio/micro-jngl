import nggt from '../../nggt.js'
import Room from '../../services/room.js'
import RoomCard from './room-card.js'
import Join from '../layout/join.js'


export default () => {
  let title = length => `
    <strong>${length > 0 ? length : 'No'} Rooms Available</strong>
    <hr>
  `
  
  let openRoomSub
  return nggt.create({
    template: `
      <div class="rooms card" id="container">
        ${title(0)}
      </div>
    `,
    run: async (ui, data) => {
      openRoomSub = Room.service.openRooms.onChange(rooms => {
        let html = Join(title(rooms.length), ...rooms.map(room => RoomCard(room)))
        ui.container.innerHTML = html
      })
      if(Room.service.openRooms.val().length === 0)
        Room.getOpenRooms()
    },
    cleanup: () => {
      Room.service.openRooms.cleanup(openRoomSub)
    }
  })
}
import nggt from '../../nggt.js'
import Room from '../../services/room.js'
import RoomCard from './room-card.js'
import Layout from '../layout/module.js'


export default () => {
  let title = length => `
    <strong>${length > 0 ? length : 'No'} Rooms Available</strong>
  `
  
  let openRoomSub
  return nggt.create({
    template: Layout.Id('div', 'container', ['rooms', 'panel'], title(0)),
    run: async (ui, data) => {
      openRoomSub = Room.service.openRooms.onChange(rooms => {
        if(rooms.error) return console.log(rooms.error)
        let html = Layout.Join(title(rooms.length), ...rooms.map(room => RoomCard(room)))
        ui.container.innerHTML = html
      })
      if(Room.service.openRooms.val().length === 0)
        Room.getOpenRooms()
    },
    cleanup: () => {
      openRoomSub.cleanup()
    }
  })
}
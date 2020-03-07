import gui from '../../gui.js'
import RoomCard from './room-card.js'

export default rooms => {
  classList: ['rooms card'],
  template: `
    <strong id="roomViewTitle">No Rooms Available</strong>
    <hr>
  `,
  onload: [['#roomViewTitle'], (ui, el) => {
    let roomContainer = { el }
    let roomCards = []

    newRoomInterval = roomService.onNewRoom(r => {
        let roomContainer = { el }
        roomCards.push(RoomCard(r, roomContainer))
        rooms.push(r)
    })
  }]
}
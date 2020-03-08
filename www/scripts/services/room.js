import nggt from '../nggt.js'

const roomService = nggt.service({
  openRooms: nggt.dataObj([]),
  newRoom: nggt.dataObj()
})

const getOpenRooms = async () => {
  await roomService.read('openRooms', 'getRoom', { isOpen: true })
  return roomService.openRooms
}

const newRoom = async () => {
  await roomService.read('newRoom', 'newRoom')
  return roomService.newRoom
}

const clearRooms = async () => {
  await roomService.read('openRooms', 'clearRooms')
  return roomService.openRooms
}

roomService.newRoom.onChange(room => room
  ? roomService.openRooms.change(ar => ar.push(room))
  : null
)

export default { getOpenRooms, newRoom, clearRooms, service: roomService }
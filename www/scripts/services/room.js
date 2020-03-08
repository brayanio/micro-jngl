import nggt from '../nggt.js'

const roomService = nggt.service({
  openRooms: nggt.dataObj([]),
  joinedRoom: nggt.dataObj()
})

const getOpenRooms = async () => {
  await roomService.read('openRooms', 'getRoom', { isOpen: true })
  return roomService.openRooms
}

const newRoom = async () => {
  await roomService.read('joinedRoom', 'newRoom')
  return roomService.newRoom
}

const clearRooms = async () => {
  await roomService.read('openRooms', 'clearRooms')
  return roomService.openRooms
}

const joinRoom = async room => {
  roomService.joinedRoom.change(room)
  return roomService.joinedRoom
}

roomService.joinedRoom.onChange(room => room ? location.hash = '#/room' : null)

export default { getOpenRooms, newRoom, clearRooms, joinRoom, service: roomService }
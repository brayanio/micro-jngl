import nggt from '../nggt.js'
import authService from './auth.js'
const auth = body => { 
  if(body)
    return { ...body, auth: authService.service.profile.val() } 
  return { auth: authService.service.profile.val() } 
}

const roomService = nggt.service({
  openRooms: nggt.dataObj([]),
  joinedRoom: nggt.dataObj()
})

const getOpenRooms = async () => {
  await roomService.read('openRooms', 'getRooms', auth())
  return roomService.openRooms
}

const newRoom = async () => {
  await roomService.read('joinedRoom', 'newRoom', auth())
  return roomService.joinedRoom
}

const joinRoom = async room => {
  let id = room.meta.id
  await roomService.read('joinedRoom', 'joinRoom', auth({id}))
  return roomService.joinedRoom
}

const leaveRoom = async () => {
  let room = roomService.joinedRoom.val()
  if(room){
    let id = room.id
    roomService.joinedRoom.change(null)
    await roomService.read('openRooms', 'leaveRoom', auth({id}))
    return roomService.openRooms
  }
}

const clearRooms = async () => {
  await roomService.read('openRooms', 'clearRooms', auth())
  return roomService.openRooms
}

roomService.joinedRoom.onChange(room => {
  console.log(room)
  room ? location.hash = '#/room' : null
})

export default { getOpenRooms, newRoom, clearRooms, joinRoom, service: roomService, leaveRoom }
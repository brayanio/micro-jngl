import nggt from '../nggt.js'
import authService from './auth.js'

const auth = body => { 
  if(body)
    return { ...body, auth: authService.service.profile.val() } 
  return { auth: authService.service.profile.val() } 
}

const roomService = nggt.service({
  openRooms: nggt.dataObj([]),
  joinedRoom: nggt.dataObj(),
  game: nggt.dataObj()
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

const startRoom = async () => {
  const room = roomService.joinedRoom.val()
  if(room){
    const id = room.id
    await roomService.read('game', 'startRoom', auth({id}))
    return roomService.openRooms
  }
}

const checkRoom = async () => {
  const room = roomService.joinedRoom.val()
  if(room){
    const id = room.id
    await roomService.read('game', 'checkRoom', auth({id}))
    return roomService.openRooms
  }
}

roomService.joinedRoom.onChange(room => {
  console.log(room)
  room ? location.hash = '#/room' : null
})

roomService.game.onChange(obj => {
  console.log(obj)
  if(!obj) return null
  if(obj.status) return null
  if(location.hash !== '#/game')
    location.hash = '#/game'
})

export default { 
  getOpenRooms, 
  newRoom, 
  clearRooms, 
  joinRoom, 
  service: roomService, 
  leaveRoom, 
  startRoom, 
  checkRoom 
}
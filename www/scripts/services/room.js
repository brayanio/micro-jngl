import post from './post.js'

const getOpenRooms = async () => {
  const rooms = await post('getRoom', { isOpen: true })
  return rooms
}

const newRoom = async () => {
  const room = await post('newRoom')
  Object.values(newRoomSub).forEach(fn => fn(room))
  return room
}
let newRoomSub = {}
const onNewRoom = (fn, id = Math.round(Math.random() * 10000000000000)) => {
  newRoomSub[id] = fn
  return id
}
const onNewRoomCleanup = id => delete newRoomSub[id]

const clearRooms = async () => {
  const res = await post('clearRooms')
  return res
}

export default { getOpenRooms, newRoom, onNewRoom, onNewRoomCleanup, clearRooms }
import post from './post.js'

const getOpenRooms = async () => {
  const rooms = await post('getRoom', { isOpen: true })
  return rooms
}

const newRoom = async () => {
  const room = await post('newRoom')
  return room
}

export default { getOpenRooms, newRoom }
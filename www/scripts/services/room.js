import cache from './cache.js'

const getOpenRooms = async () => {
  await cache().read('openRooms', 'getRoom', { isOpen: true })
  return cache().openRooms
}

const newRoom = async () => {
  await cache().read('newRoom', 'newRoom')
  return cache().newRoom
}

const clearRooms = async () => {
  await cache().read('openRooms', 'clearRooms')
  return cache().openRooms
}

const data = {
  openRooms: () => cache().openRooms || getOpenRooms(),
  newRoom: () => cache().newRoom || newRoom()
}

export default { getOpenRooms, newRoom, clearRooms, data }
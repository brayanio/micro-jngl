import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => {
  let joinedRoom = roomService.service.joinedRoom

  if(!joinedRoom.val()){
    location.hash = '#/'
    return ''
  }

  return nggt.create({
    isRoot: true,
    classList: ['game'],
    template: Prefabs.Join(
      `<h1>Works</h1>`
    )
  })
}
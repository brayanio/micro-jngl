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
    classList: ['room-lobby'],
    template: Prefabs.ColGrid(3, 7, 
      Prefabs.Join(
        Prefabs.Header('Zone', 'Danger'),
        Prefabs.Container('div', ['panel'],
          `<strong>${joinedRoom.val().meta.host.username}</strong>`,
          Prefabs.Nav('Lobby')
        )
      ),
      Prefabs.Join(
        Prefabs.Container('div', ['panel'],
          `<strong>Room Lobby</strong>`
        )
      )
    )
  })
}
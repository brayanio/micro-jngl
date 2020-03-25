import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => {
  let joinedRoom = roomService.service.joinedRoom

  if (!joinedRoom.val()) {
    location.hash = '#/'
    return ''
  }

  let roomSub, roomInterval
  return nggt.create({
    isRoot: true,
    classList: ['room-lobby'],
    template: Prefabs.ColGrid(3, 7,
      Prefabs.Sidebar('Danger', 'Zone', [],
        Prefabs.Container('nav', ['right'],
          Prefabs.LinkBtn('Leave', () => roomService.leaveRoom())
        )
      ),
      Prefabs.Container('div', ['panel'],
        Prefabs.Bold(`Room Lobby`),
        Prefabs.UL(...joinedRoom.val().players.map(player =>
          Prefabs.Bold(player.username)
        )),
        Prefabs.Container('div', ['right'],
          Prefabs.LinkBtn('Start', () => roomService.startRoom())
        )
      )
    ),
    run: (ui) => {

      roomSub = joinedRoom.onChange(room => {
        if (!room)
          location.hash = '#/'
      })
    },
    cleanup: () => {
      roomSub.cleanup()
    }
  })
}
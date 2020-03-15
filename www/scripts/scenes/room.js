import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => {
  let joinedRoom = roomService.service.joinedRoom

  if(!joinedRoom.val()){
    location.hash = '#/'
    return ''
  }

  let roomSub
  return nggt.create({
    isRoot: true,
    classList: ['room-lobby'],
    template: Prefabs.ColGrid(3, 7, 
      Prefabs.Join(
        Prefabs.Header('Zone', 'Danger'),
        Prefabs.Container('div', ['panel'],
          `<strong>${joinedRoom.val().host.username}</strong>`,
          Prefabs.Container('nav', ['right'],
            Prefabs.LinkBtn('Leave', () => roomService.leaveRoom())
          )
        )
      ),
      Prefabs.Join(
        Prefabs.Container('div', ['panel'],
          `<strong>Room Lobby</strong><br>`,
          `<ul>`,
            Prefabs.Join(joinedRoom.val().players.map(player => `
            <li>
              <strong>${player.username}</strong>
            </li>
            `)),
          `</ul>`,
        ),
        Prefabs.Container('div', ['panel right'],
          Prefabs.LinkBtn('Start', () => {location.hash = '#/game'})
        )
      )
    ),
    run: (ui) => {
      roomSub = joinedRoom.onChange(room => {
        if(!room)
          location.hash = '#/'
      })
    },
    cleanup: () => {
      roomSub.cleanup()
    }
  })
}
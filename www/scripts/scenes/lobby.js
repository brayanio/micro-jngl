import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => nggt.create({
  isRoot: true,
  classList: ['lobby'],
  template: Prefabs.ColGrid(3, 7, 
    Prefabs.Join(
      Prefabs.Header('JNGL', 'Micro'),
      Prefabs.Container('div', ['card'],
        Prefabs.Nav('Cookbook'),
        Prefabs.Container('div', ['links'],
          Prefabs.LinkBtn('Refresh', () => roomService.getOpenRooms()),
          Prefabs.LinkBtn('Create Room', () => roomService.newRoom()),
          Prefabs.LinkBtn('Clear Rooms', () => roomService.clearRooms()),
        )
      )
    ),
    Prefabs.RoomView()
  )
})
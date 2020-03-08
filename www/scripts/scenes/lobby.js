import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => {
  let login = nggt.dataObj(false)

  return nggt.create({
    isRoot: true,
    classList: ['lobby'],
    template: Prefabs.Join(
      Prefabs.ColGrid(3, 7, 
        Prefabs.Join(
          Prefabs.Header('JNGL', 'Micro'),
          Prefabs.Container('div', ['card'],
            Prefabs.Nav('Cookbook'),
            Prefabs.Container('div', ['links'],
              Prefabs.LinkBtn('Login', () => login.change(true)),
              Prefabs.LinkBtn('Refresh', () => roomService.getOpenRooms()),
              Prefabs.LinkBtn('Create Room', () => roomService.newRoom()),
              Prefabs.LinkBtn('Clear Rooms', () => roomService.clearRooms()),
              Prefabs.LinkBtn('Exit', () => fetch('http://localhost:4404'))
            )
          )
        ),
        Prefabs.RoomView()
      ),
      Prefabs.Login(login)
    ),
    run: (ui, data) => {
      setTimeout(()=>login.change(true), 3000)
    }
  })
}
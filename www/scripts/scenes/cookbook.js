import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => {
  nggt.create({
    isRoot: true,
    classList: ['cookbook'],
    template: Prefabs.ColGrid(3, 7, 
      Prefabs.Join(
        Prefabs.Header('Book', 'Cook'),
        Prefabs.Container('div', ['panel'],
          Prefabs.Nav('Lobby'),
          Prefabs.Container('div', ['links'],
            Prefabs.LinkBtn('Heros', () => modal.change(true)),
            Prefabs.LinkBtn('Units', () => {}),
            Prefabs.LinkBtn('Basics', () => {}),
            Prefabs.LinkBtn('Advanced', () => {}),
            Prefabs.LinkBtn('Dojo', () => {})
          )
        )
      ),
      Prefabs.Join(`
        <div>
          ${Prefabs.Hero()}
        </div>
        `
      )
    )
  })
}
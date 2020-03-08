import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => nggt.create({
  isRoot: true,
  classList: ['cookbook'],
  template: Prefabs.ColGrid(3, 7, 
    Prefabs.Join(
      Prefabs.Header('Book', 'Cook'),
      `<hr>`,
      Prefabs.Nav('Lobby'),
      `<hr>`,
      Prefabs.Container('div', ['links'],
        Prefabs.LinkBtn('Heros', () => {}),
        Prefabs.LinkBtn('Units', () => {}),
        Prefabs.LinkBtn('Basics', () => {}),
        Prefabs.LinkBtn('Advanced', () => {}),
        Prefabs.LinkBtn('Dojo', () => {})
      ),
      `<hr>`
    ),
    `
    <div>
      ${Prefabs.Hero()}
    </div>
    `
  )
})
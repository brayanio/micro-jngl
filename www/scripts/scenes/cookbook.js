import nggt from '../nggt.js'
import ColGrid from '../prefabs/layout/col-grid.js'
import Container from '../prefabs/layout/container.js'
import Header from '../prefabs/layout/header.js'
import Join from '../prefabs/layout/join.js'
import LinkBtn from '../prefabs/layout/link-btn.js'
import Nav from '../prefabs/layout/nav.js'
import RoomView from '../prefabs/lobby/room-view.js'

import roomService from '../services/room.js'

export default () => nggt.create({
  isRoot: true,
  classList: ['cookbook'],
  template: ColGrid(3, 7, 
    Join(
      Header('Book', 'Cook'),
      `<hr>`,
      Nav('Lobby'),
      `<hr>`,
      Container('div', ['links'],
        LinkBtn('Heros', () => {}),
        LinkBtn('Units', () => {}),
        LinkBtn('Basics', () => {}),
        LinkBtn('Advanced', () => {}),
        LinkBtn('Dojo', () => {})
      ),
      `<hr>`
    ),
    RoomView()
  )
})
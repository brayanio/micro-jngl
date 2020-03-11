import nggt from '../nggt.js'
import jngl from '../jngl.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

export default () => {
  let joinedRoom = roomService.service.joinedRoom

  // if(!joinedRoom.val()){
  //   location.hash = '#/'
  //   return ''
  // }

  const map = {
    rect: {x: 0, y: 0, w: 1440, h: 900}
  }

  const player = {
    id: 'player',
    clickable: true,
    rect: {x: 10, y: 10, w: 100, h: 100}
  }

  return nggt.create({
    isRoot: true,
    classList: ['game'],
    template: Prefabs.Join(
      Prefabs.Map(map,
        Prefabs.Sprite(player, 'hi')
      ),
      Prefabs.Guides(5, 5)
    ),
    run: (ui) => {
      ui.player.addEventListener('click', () => jngl.Sprite.select('player'))
    },
    cleanup: () => {
      jngl.Sprites.cleanup()
      jngl.Map.cleanup()
    }
  })
}
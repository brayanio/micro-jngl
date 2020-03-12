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

  const modalOptions = {closeOnClick: true, classList: ['settings'], ui: 'settingsModal'}
  const settingsObj = nggt.dataObj(false)
  return nggt.create({
    isRoot: true,
    classList: ['game'],
    template: Prefabs.Join(
      Prefabs.Map(map,
        Prefabs.Sprite(player, '1')
      ),
      Prefabs.UI(),
      '<div class="settings-btn">',
        Prefabs.IconBtn('more_vert', () => settingsObj.change(true)),
      '</div>',
      Prefabs.Modal(settingsObj, modalOptions,
        `<h2>`,
          Prefabs.IconBtn('close', () => settingsObj.change(false)),
          `<span class="header-text">Settings</span>
        </h2>`
      )
      // Prefabs.Guides(5, 5)
    ),
    run: (ui) => {
      ui.player.addEventListener('click', () => jngl.Sprite.select('player'))
      jngl.Loop.start()
      jngl.pushToStack(() => jngl.Map.focusSprite('player'))
    },
    cleanup: () => {
      jngl.Loop.stop()
      jngl.Sprites.cleanup()
      jngl.Map.cleanup()
      jngl.Loop.cleanup()
    }
  })
}
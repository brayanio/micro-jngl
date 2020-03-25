import nggt from '../nggt.js'
import jngl from '../jngl.js'
import Prefabs from '../prefabs/module.js'
import authService from '../services/auth.js'
import roomService from '../services/room.js'
import gameService from '../services/game.js'

export default () => {
  let joinedRoom = roomService.service.joinedRoom

  // if(!joinedRoom.val()){
  //   location.hash = '#/'
  //   return ''
  // }

  const modalOptions = {closeOnClick: true, classList: ['settings'], ui: 'settingsModal'}
  const settingsObj = nggt.dataObj(false)
  return nggt.create({
    isRoot: true,
    classList: ['game'],
    template: Prefabs.Join(
      Prefabs.Map(),
      Prefabs.UI(),
      Prefabs.Container('div', ['settings-btn'], 
        Prefabs.IconBtn('more_vert', () => settingsObj.change(true))
      ),
      Prefabs.Modal(settingsObj, modalOptions,
        Prefabs.Container('h2', [],
          Prefabs.IconBtn('close', () => settingsObj.change(false)),
          Prefabs.Container('span', ['header-text'], 'Settings')
        ),
        `<hr>`,
        Prefabs.LinkBtn('Leave Match', () => location.hash = '#/lobby')
      )
      // Prefabs.Guides(5, 5)
    ),
    run: (ui) => {
      jngl.Loop.start()
      ui.map.addEventListener('click', e => jngl.Map.click(e, ui.map))
      // jngl.pushToStack(() => jngl.Map.focusSprite('player'))
      // ui.player.addEventListener('click', () => jngl.Sprite.select('player'))
      if(roomService.service.game.val())
        jngl.pushToStack(() => gameService.start(roomService.service.game.val()))
      else 
        location.hash = '#/'
    },
    cleanup: () => {
      gameService.stop()
      jngl.Loop.stop()
      jngl.Sprite.cleanup()
      jngl.Map.cleanup()
      jngl.Loop.cleanup()
    }
  })
}
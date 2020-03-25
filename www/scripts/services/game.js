import nggt from '../nggt.js'
import jngl from '../jngl.js'
import authService from './auth.js'

const gameService = nggt.service({
  roomId: null,
  game: {},
  updates: nggt.dataObj()
})

const auth = body => {
  if(authService.service.profile.val())
    return { ...body, auth: authService.service.profile.val(), id: gameService.roomId }
}

const getUpdates = async () => {
  await gameService.read('updates', 'get-updates', auth({}), null)
  return gameService.updates
}

const init = async (ids) => {
  await gameService.read('updates', 'init', auth({ids}))
  return gameService.init
}

const move = async (target) => {
  const cmd = {
    type: 'sprite',
    selectedSprites: jngl.Core.selectedSprites().val(),
    fn: 'move',
    params: target
  }
  gameService.send('game-command', auth({cmd}))
}

//

let gameInterval = null
const stop = () => {
  if(gameInterval !== null)
    clearInterval(gameInterval)
  gameInterval = null
}
const start = (update) => {
  gameService.roomId = update.id
  gameService.updates.change(update)
  gameInterval = setInterval(() => {
    getUpdates()
    window.stopUpdates = () => stop()
  }, 500)
}

gameService.updates.onChange(game => {
  if(game){
    if(game.map.size){
      console.log('game', game)
      jngl.Core.map().change(map => {
        console.log('mappy', map)
        map.rect.w = game.map.size.w
        map.rect.h = game.map.size.h
        return map
      })
    }

    Object.values(game.map.players).forEach(player =>
      Object.values(player.team).forEach(unit => jngl.Sprite.update(unit, player))
    )
    const initAr = jngl.Core.init().val()
    if(initAr.length > 0){
      jngl.Core.init().change([])
      init(initAr)
    }
  }
})

//

export default { 
  getUpdates,
  move,
  service: gameService,
  start,
  stop
}
import nggt from './nggt.js'
import Controls from './jngl/controls.js'
import Loop from './jngl/loop.js'
import Map from './jngl/map.js'
import Rect from './jngl/rect.js'
import Sprite from './jngl/sprite.js'

// GAME CONSTS
const 
GAME_WIDTH = 1200,
GAME_HEIGHT = 800,
MIN_ZOOM = .5,
MAX_ZOOM = 5,
DEFAULT_SCROLL_SPEED = 25

// END GAME CONSTS

const core = nggt.dataObj({
  gameSize: {w: GAME_WIDTH, h: GAME_HEIGHT},
  windowSize: {w: innerWidth, h: innerHeight},
  gameZoom: 1,
  scrollSpeed: DEFAULT_SCROLL_SPEED,
  map: nggt.dataObj(),
  selectedSprites: nggt.dataObj([]),
  sprites: nggt.dataObj({}),
  coreLoops: nggt.dataObj([]),
  loops: nggt.dataObj({}),
  controls: nggt.dataObj({})
})

const controls = Controls(core)
const loop = Loop(core)
const map = Map(core)
const rect = Rect(core)
const sprite = Sprite(core)

const resize = () => {
  if(location.hash !== '#/game') return null
  // update window size
  let game = document.querySelector('.game')
  if(game){
    let frameSize = game.getBoundingClientRect()
    core.change(obj => obj.windowSize = { w: frameSize.width, h: frameSize.height })
  }
  // update sprites
  let el, spriteAr = Object.values(core.val().sprites.val())
  if(spriteAr){
    spriteAr.forEach(sprite => {
      el = document.querySelector(`[game=${sprite.id}]`)
      if(el)
        rect.update(el, sprite.rect)
    })
  }
  // update map
  let m = core.val().map.val()
  if(m){
    el = document.querySelector(`[game="map"]`)
    if(el)
      rect.update(el, m.rect)
  }
}

const zoom = val => {
  core.change(obj => {
    obj.gameZoom += val
    if(gameZoom < MIN_ZOOM)
      obj.gameZoom = MIN_ZOOM
    if(gameZoom > MAX_ZOOM)
      obj.gameZoom = MAX_ZOOM
  })
  resize()
}

addEventListener('resize', () => resize())
core.val().map.onChange(() => resize())

const pushToStack = fn => setTimeout(() => fn(), 0)

export default { 
  Controls: controls,
  Core: {
    map: () => core.val().map,
    selectedSprites: () => core.val().selectedSprites,
    sprites: () => core.val().sprites
  },
  Loop: loop,
  Map: map, 
  Rect: rect, 
  Sprite: sprite,
  pushToStack,
  resize,
  zoom
 }
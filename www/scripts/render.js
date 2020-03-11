import nggt from './nggt.js'

let gameSize = {w: 800, h: 600}
let windowSize = {w: innerWidth, h: innerHeight}
let gameZoom = 1;

const setup = (w, h) => {
  gameSize = {w, h}
}

const resizeW = val => Math.round(val * (windowSize.w / gameSize.w) * gameZoom)
const resizeH = val => Math.round(val * (windowSize.h / gameSize.h) * gameZoom)

const bounds = (x, y, w, h) => {
  if(typeof x != 'string'){
    y = x.y
    w = x.w
    h = x.h
    x = x.x
  }
  return {
    x: resizeW(x) + 'px',
    w: resizeW(w || x) + 'px',
    y: resizeH(y) + 'px',
    h: resizeH(h || y) + 'px'
  }
}

const zoom = val => {
  gameZoom += val
  if(gameZoom < .5)
    gameZoom = .5
  if(gameZoom > 5)
    gameZoom = 5
  resize()
}

const updateSprite = (el, options) => {
  let b = bounds(options.rect)
  el.style.top = b.y
  el.style.left = b.x
  el.style.width = b.w
  el.style.height = b.h
}

const sprites = nggt.dataObj({})
const registerSprite = options => sprites.change(obj => obj[options.id] = options)
const clearSprites = sprites.change({})

const resize = () => {
  windowSize = { w: innerWidth, h: innerHeight }
  if(location.hash !== '#/game') return null
  let spriteAr = Object.values(sprites.val())
  if(spriteAr){
    let el, rect
    spriteAr.forEach(sprite => {
      el = document.querySelector(`[game=${sprite.id}]`)
      if(el)
        updateSprite(el, sprite)
    })
  }
}

addEventListener('resize', () => resize())

export default { setup, bounds, zoom, registerSprite, clearSprites }
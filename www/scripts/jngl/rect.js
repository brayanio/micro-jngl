/*
  gameSize: {w: 800, h: 600},
  windowSize: {w: innerWidth, h: innerHeight},
  gameZoom: 1;
*/

export default coreObj => {
  const core = coreObj.val()

  const resizeW = val => Math.round(val * (core.windowSize.w / core.gameSize.w) * core.gameZoom)
  const resizeH = val => Math.round(val * (core.windowSize.h / core.gameSize.h) * core.gameZoom)

  const scale = rect => {
    return {
      x: resizeW(rect.x),
      w: resizeW(rect.w),
      y: resizeH(rect.y),
      h: resizeH(rect.h)
    }
  }

  const style = rect => {
    let r = scale(rect)
    r.x += 'px'
    r.y += 'px'
    r.w += 'px'
    r.h += 'px'
    return r
  }

  const update = (el, rect) => {
    let b = style(rect)
    el.style.left = b.x
    el.style.top = b.y
    el.style.width = b.w
    el.style.height = b.h
  }

  return {
    scale, style, update
  }
}
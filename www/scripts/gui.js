const rect = (x, y, w, h) => { return { x, y, w, h } }

let res = { x: 1920, y: 1080 }
const scale = (x, y) => {
  let e = {
    x: Math.round(innerWidth / (res.x || 1) * x),
    y: Math.round(innerHeight / (res.y || 1) * y)
  }
  e.w = e.x
  e.h = e.y
  return e
}

const sprite = props => {
  props = props || {}
  const el = document.createElement(props.el || 'div')
  el.classList.add('sprite')
  if (props.classList)
    el.classList.add(...props.classList)
  if (props.text)
    el.innerText = props.text

  const draw = () => {
    let loc = scale(bounds.x || 0, bounds.y || 0)
    let size = scale(bounds.w || 0, bounds.h || 0)
    bounds.x = loc.x
    bounds.y = loc.y
    bounds.w = size.w
    bounds.h = size.h
    el.style.left = bounds.x + 'px'
    el.style.top = bounds.y + 'px'
    el.style.width = bounds.w + 'px'
    el.style.height = bounds.h + 'px'
  }

  let bounds = props.bounds || rect(0, 0, 10, 10)
  if (props.bounds)
    draw()

  const setBounds = rec => {
    if (rec.x) bounds.x = rec.x
    if (rec.y) bounds.y = rec.y
    if (rec.w) bounds.w = rec.w
    if (rec.h) bounds.h = rec.h
    draw()
  }
  const move = (x, y) => setBounds(Object.assign(bounds, { x: bounds.x + x, y: bounds.y + y }))
  const resize = (w, h) => setBounds(Object.assign(bounds, { w, h }))

  let avatarEl
  const avatar = src => {
    if (!avatarEl) {
      avatarEl = document.createElement('img')
      el.appendChild(avatarEl)
    }
    avatarEl.src = src
    return { el: avatarEl, src }
  }

  const on = (e, fn) => el.addEventListener(e, ev => fn(ev, el))

  const remove = () => el.parentElement.removeChild(el)

  if (props.avatar)
    avatar(props.avatar)

  if (props.append)
    props.append.el.appendChild(el)

  if (props.template)
    el.innerHTML = props.template

  if (props.onload)
    onload(props.onload[0], props.onload[1], el)

  return { el, avatar, setBounds, on, move, resize, bounds, draw, remove }
}

const grab = sel => document.querySelector(sel)
const onload = (ids, fn, props) => setTimeout(() => {
  let e = {}
  ids.forEach(id => e[id.substr(1)] = grab(id))
  fn(e, props)
}, 0)

export default { rect, sprite, res, scale, grab, onload }
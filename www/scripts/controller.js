let dir = {w: false, s: false, a: false, d: false}
let intervals = []
let actions = {}

const key = e => {
    let val = e.key.toLowerCase()
    if(val === 'arrowup')
        val = 'w'
    if(val === 'arrowright')
    val = 'd'
    if(val === 'arrowleft')
    val = 'a'
    if(val === 'arrowdown')
        val = 's'
    return val
}

const listen = () => {
    addEventListener('keydown', e => {
        let res = true
        if(dir[key(e)] !== undefined)
            dir[key(e)] = res
    })

    addEventListener('keyup', e => {
        let res = false
        if(dir[key(e)] !== undefined)
            dir[key(e)] = res
    })

    addEventListener('keypress', e => {
        if(actions[key(e)])
            Object.values(actions[key(e)]).forEach(fn => fn(e))
    })
}

const oni = (v, fn, i) => intervals.push(
    setInterval(() => {
        if(dir[v])
            fn()
    }, i)
)

const onaction = (key, name, fn) => {
    if(actions[key])
        actions[key][name] = fn
    else
        actions[key] = {[name]: fn}
}

const removeAction = (key, name) => {
    if(actions[key] && actions[key][name])
        delete actions[key][name]
}

//gameloop
let currentLoop;
const onloop = loop => {
  let last = new Date().getTime(),
      dt = 1000 / 60, //60 fps
      accumulator = 0
  const fn = () => {
    let now = new Date().getTime(), 
        passed = now - last
    last = now
    accumulator += passed
    while(accumulator > dt){
      loop(accumulator, dir)
      accumulator -= dt
    }
    currentLoop = requestAnimationFrame(fn)
  }
  currentLoop = requestAnimationFrame(fn)
}
const endloop = () => currentLoop && cancelAnimationFrame(currentLoop)

export default {
    listen, oni, onloop, onaction, removeAction, actions
}
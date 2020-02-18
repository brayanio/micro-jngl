let dir = {w: false, s: false, a: false, d: false}
let intervals = []

const listen = () => {
    addEventListener('keydown', e => {
        let res = true
        if(dir[e.key] !== undefined)
            dir[e.key] = res
    })

    addEventListener('keyup', e => {
        let res = false
        if(dir[e.key] !== undefined)
            dir[e.key] = res
    })
}

const oni = (v, fn, i) => intervals.push(
    setInterval(() => {
        if(dir[v])
            fn()
    }, i)
)

//gameloop
let currentLoop;
const onloop = loop => {
  let last = new Date().getTime(),
      dt = 1000 / 30, //60 fps
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
    listen, oni, onloop
}
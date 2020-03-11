export default coreObj => {
  const core = () => coreObj.val()
  const create = (id, fn) => core().loops.change(obj => obj[id] = fn)
  const cleanup = () => core().loops.change({})
  const remove = id => core().loops.change(obj => delete obj[id])

  let currentLoop;
  const start = () => {
    let last = new Date().getTime(),
        dt = 1000 / 30, //60 fps
        accumulator = 0
    const fn = () => {
      let now = new Date().getTime(), 
          passed = now - last
      last = now
      accumulator += passed
      while(accumulator > dt){
        core().coreLoops.val().forEach(f => f(accumulator))
        Object.values(core().loops.val()).forEach(f => f(accumulator))
        accumulator -= dt
      }
      currentLoop = requestAnimationFrame(fn)
    }
    currentLoop = requestAnimationFrame(fn)
  }
  const stop = () => currentLoop && cancelAnimationFrame(currentLoop)

  return {
    create,
    cleanup,
    remove,
    start,
    stop
  }
}
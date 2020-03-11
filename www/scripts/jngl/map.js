export default coreObj => {
  const core = coreObj.val()

  const register = m => core.map.change(m)
  const cleanup = () => core.map.change()

  const move = (x, y) => core.map.change(o => {
    o.rect.x += x || 0
    o.rect.y += y || 0
  })

  const focusSprite = id => {
    let s = core.sprites.val()[id]
    if(s)
      core.map.change(o => {
        o.rect.x = -s.rect.x - (s.rect.w / 2) + (core.gameSize.w / 2)
        o.rect.y = -s.rect.y - (s.rect.h / 2) + (core.gameSize.h / 2)
      })
  }

  return {  
    cleanup,
    focusSprite, 
    move,
    register
  }
}
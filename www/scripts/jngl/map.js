import gameService from '../services/game.js'

export default coreObj => {
  const core = () => coreObj.val()
  
  const cleanup = () => core().map.change()

  const move = (x, y) => core().map.change(o => {
    o.rect.x += x || 0
    o.rect.y += y || 0
  })

  const focusSprite = id => {
    let s = core().sprites.val()[id]
    if(s)
      core().map.change(o => {
        o.rect.x = -s.rect.x - (s.rect.w / 2) + (core().gameSize.w / 2)
        o.rect.y = -s.rect.y - (s.rect.h / 2) + (core().gameSize.h / 2)
      })
  }

  core().coreLoops.change(ar => ar.push((dt) => {
    if(core().selectedSprites.val().length > 0)
      focusSprite(core().selectedSprites.val()[0])
  }))

  // core().controls.change(obj => 
  //   obj.scrollBool = {left: false, top: false, right: false, bottom: false})
  
  // const scrollBool = () => core().controls.val().scrollBool

  // core().coreLoops.change(ar => ar.push((dt) => {
  //   const speed = core().scrollSpeed
  //   if(scrollBool().left)
  //     move(speed)
  //   if(scrollBool().right)
  //     move(-speed)
  //   if(scrollBool().top)
  //     move(0, speed)
  //   if(scrollBool().bottom)
  //     move(0, -speed)
  // }))

  // const scroll = (dir, val) => 
  //   core().controls.change(obj => obj.scrollBool[dir] = val)
    
  const click = (e, el) => {
    if(e.target === el) {
      const selected = core().selectedSprites.val()
      if(selected){
        let mousePos = core().fn.val().Rect.scaleMouse({x: e.x, y: e.y}, core().map.val().rect)
        if(selected.length > 0)
          gameService.move(mousePos)
      }
    }
  }

  return {  
    cleanup,
    click,
    focusSprite, 
    move,
    // scroll
  }
}
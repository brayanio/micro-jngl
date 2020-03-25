import nggt from '../nggt.js'
import Sprite from '../prefabs/game/sprite.js'

export default coreObj => {
  const core = () => coreObj.val()

  const register = options => core().sprites.change(obj => obj[options.id] = options)
  const remove = id => core().sprites.change(obj => { delete obj[id]; return obj })
  const cleanup = () => core().sprites.change({})

  const select = id => {
    if(!core().selectedSprites.val().includes(id))
      core().selectedSprites.change(ar => ar.push(id))
  }
  const deselectAll = () => core().selectedSprites.change([])
  const deselect = id => core().selectedSprites.change(ar => 
    ar = ar.filter(e => e !== id))

  let lastSelected = []
  core().selectedSprites.onChange(sel => {
    if(sel){
      let el, i
      sel.forEach(id => {
        i = lastSelected.indexOf(id)
        if(i > -1)
          lastSelected = lastSelected.splice(i, 1)
        else {
          el = document.querySelector(`[game=${id}]`)
          if(el)
            el.classList.add('selected')
        }
      })
      lastSelected.forEach(id => {
        el = document.querySelector(`[game=${id}]`)
        if(el) 
          el.classList.remove('selected')
      })
      lastSelected = [].concat(sel)
    }
  })

  const update = (spriteSendable, player) => {
    const sprite = core().sprites.val()[spriteSendable.id]
    if(!sprite) {
      const map = document.querySelector(`[game=map]`)
      const options = {
        id: spriteSendable.id,
        classList: [],
        clickable: true,
        rect: spriteSendable.rect
      }
      console.log('->->->->->->->->->player', player)
      if(player.isMe){
        let index
        Object.values(player.team).find((e, i) => {
          if( e.id === spriteSendable.id ){
            index = i + 1
            return true
          }
        })
        console.log('->->->->->->->->->index', index)
        options.classList.push('player', `sel${index}`)
      }else if(player.isAlly)
        options.classList.push('ally')
      register(options)
      map.innerHTML += Sprite(options)
      core().init.change(ar => ar.push(spriteSendable.id))
    } else {
      const el = document.querySelector(`[game=${spriteSendable.id}]`)
      if(player){
        if(player.isMe)
          el.classList.add('player')
        else if(player.isAlly)
          el.classList.add('ally')
      }
      core().sprites.change(obj => obj[spriteSendable.id].rect = spriteSendable.rect)
      if(el)
        core().fn.val().Rect.update(el, sprite.rect)
    }
  }

  return {  
    cleanup,
    deselect, 
    deselectAll,
    register,
    remove,
    select,
    update
  }
}
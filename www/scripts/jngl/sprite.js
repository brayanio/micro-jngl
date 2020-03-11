import nggt from '../nggt.js'

export default coreObj => {
  const core = () => coreObj.val()

  const register = options => core().sprites.change(obj => obj[options.id] = options)
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

  return {  
    cleanup,
    deselect, 
    deselectAll,
    register,
    select
  }
}
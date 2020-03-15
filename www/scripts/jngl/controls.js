export default coreObj => {
  const core = () => coreObj.val()

  const setup = (id, obj) =>
    core().controls.change(o => o[id] = obj)

  setup('hotkeys', {})

  const addHotkey = (key, type, fn) => {
    const hotkey = { type, fn }
    if(type === 'bool')
      hotkey.val = false
    core().controls.change(o => o.hotkeys[key] = hotkey)
  }

  const event = (key, val) => {
    if(location.hash !== '#/game') return null
    const hotkeys = core().controls.val().hotkeys
    let hotkey = hotkeys[key]
    if(hotkey.type === 'click')
      hotkey.fn()
    else
      core().controls.change(c => c.hotkeys[key].val = val)
  }

  addEventListener('keydown', e => event(e.key, true))
  addEventListener('keyup', e => event(e.key, false))

  return { setup, addHotkey }
}
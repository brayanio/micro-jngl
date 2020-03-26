import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'

const tab = (id, prefab) => Prefabs.Id('div', id, ['hidden'], prefab)

export default () => {
  let tabs = nggt.dataObj('hero'), tabSub
  return nggt.create({
    isRoot: true,
    classList: ['cookbook'],
    template: Prefabs.ColGrid(3, 7, 
      Prefabs.Sidebar('Cook', 'Book', [
          ['Lobby', '#/lobby']
        ],
        Prefabs.LinkBtn('Heros', () => tabs.change('hero')),
        Prefabs.LinkBtn('Units', () => tabs.change('unit')),
        Prefabs.LinkBtn('Basics', () => {}),
        Prefabs.LinkBtn('Advanced', () => {}),
        Prefabs.LinkBtn('Dojo', () => {})
      ),
      Prefabs.Join(
        tab('hero', Prefabs.Hero),
        tab('unit', Prefabs.Unit)
      )
    ),
    run: (ui, data) => {
      ui = {...ui, ...data.val()}
      let curTab
      tabSub = tabs.onChange(t => {
        if(curTab)
          curTab.classList.add('hidden')
        curTab = ui[t]
        curTab.classList.remove('hidden')
      })
    },
    cleanup: () => {
      tabSub.cleanup()
    }
  })
}
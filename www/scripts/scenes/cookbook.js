import gui from '../gui.js'

import Micro from '../prefabs/cookbook/micro.js'
import Hero from '../prefabs/cookbook/hero.js'
import Unit from '../prefabs/cookbook/unit.js'

let container, interval
export default {
  run: async () => {
    return container = gui.sprite({
      classList: ['cookbook', 'drow'],
      template: `
        <div class="d3">
          <strong>Welcome to the</strong>
          <h1><small id="micro">cook</small>Book</h1>
          <nav>
            <a href="#/">Lobby</a>
          </nav>
          <hr>
          <div class="links">
            <button class="link active" id="heros">Heros</button>
            <button class="link" id="units">Units</button>
            <span class="link">Basics</span>
            <span class="link">Advanced</span>
            <span class="link">Dojo</span>
          </div>
          <hr>
        </div>
        <div class="d7"></div>
      `,
      onload: [['#heros', '#units', '.d7'], ui => {
        let tab = 'hero', tabSubs = [
          t => {
            if(t === 'hero') {
              ui.heros.classList.add('active')
              ui.units.classList.remove('active')
            } else {
              ui.units.classList.add('active')
              ui.heros.classList.remove('active')
            }
          }
        ]
        const changeTab = v => tabSubs.forEach(fn => fn(tab = v))
        ui.heros.addEventListener('click', () => changeTab('hero'))
        ui.units.addEventListener('click', () =>changeTab('unit'))

        Hero({ el: ui.d7, tabSubs })
        Unit({ el: ui.d7, tabSubs })
        Micro(interval, 4, true)
      }],
      append: { el: document.body }
    })
  },
  cleanup: () => {
    document.body.removeChild(container.el)
    clearInterval(interval)
  } 
}
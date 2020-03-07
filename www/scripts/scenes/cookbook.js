import gui from '../gui.js'

import Micro from '../prefabs/cookbook/micro.js'

let container, interval
export default {
  run: async () => {
    container = gui.sprite({
      classList: ['cookbook'],
      template: `
        <div class="d3">
          <strong>Welcome to the</strong>
          <h1><small id="micro">cook</small>Book</h1>
          <nav>
            <a href="#/">Lobby</a>
          </nav>
          <hr>
          <div class="card">
            <button class="link" id="heros">Heros</button>
            <button class="link" id="units">Units</button>
          </div>
        </div>
        <div class="d7">

        </div>
      `,
      onload: [['#heros', '#units'], ui => {
        ui.heros.addEventListener('click', () => {
          ui.heros.classList.add('active')
          ui.units.classList.remove('active')
        })
        ui.units.addEventListener('click', () => {
          ui.units.classList.add('active')
          ui.heros.classList.remove('active')
        })
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
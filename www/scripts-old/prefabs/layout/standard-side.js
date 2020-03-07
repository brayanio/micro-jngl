import gui from '../../gui.js'
import Micro from './micro.js'

let interval
export default (append, title, micro, nav, links) => gui.sprite({
  template: `
    <strong>Welcome to the</strong>
    <h1><small id="micro">${micro}</small>${title}</h1>
    <nav>
      <a href="#/${nav.toLowerCase()}">${nav}</a>
    </nav>
    <hr>
    <div class="links">
    </div>
    <hr>
  `,
  onload: [['.links', '#sideContent'], (ui, el) => {
    Micro(title, interval, false)
    links.forEach(link => ui.links.appendChild(link))
  }],
  out: () => interval,
  append
})
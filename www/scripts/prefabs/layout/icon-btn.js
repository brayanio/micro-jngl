import nggt from '../../nggt.js'
import Icon from './icon.js'

export default (icon, fn) => nggt.create({
  template: `<button type="button" class="icon-btn" id="btn">${Icon(icon)}</button>`,
  run: (ui, data) => 
    ui.btn.addEventListener('click', e => fn(e))
})
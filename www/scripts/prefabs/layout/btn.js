import nggt from '../../nggt.js'
import Icon from './icon.js'

export default (classlist, inner, fn) => nggt.create({
  template: `<button type="button" class="${classlist.join(' ')}" id="btn">${inner}</button>`,
  run: ui => ui.btn.addEventListener('click', e => fn(e))
})
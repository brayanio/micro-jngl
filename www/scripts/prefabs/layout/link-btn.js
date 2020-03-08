import nggt from '../../nggt.js'

export default (text, fn) => nggt.create({
  template: `<button type="button" class="link" id="btn">${text}</button>`,
  run: (ui, data) => 
    ui.btn.addEventListener('click', () => fn())
})
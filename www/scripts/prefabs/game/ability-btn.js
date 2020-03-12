import nggt from '../../nggt.js'
import jngl from '../../jngl.js'

export default (text, hotkey, fn) => nggt.create({
  template: `
    <button id="btn" class="ability-btn">
      <span class="hotkey">${hotkey}</span>
      <span>${text}</span>
    </button>
  `,
  run: ui => {
    ui.btn.addEventListener('click', () => fn())
    jngl.Controls.addHotkey(hotkey, 'click', () => fn())
  },
  cleanup: () => {

  }
})
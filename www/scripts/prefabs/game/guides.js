import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import Join from '../layout/join.js'

const moveEvent = (el, x, y) => {
  el.addEventListener('click', () => jngl.Map.move(x, y))
}
export default (x, y) => nggt.create({
  template: `
    <div class="guides">
      <button type="button" class="top" id="guide_top"></button>
      <button type="button" class="bottom" id="guide_bottom"></button>
      <button type="button" class="left" id="guide_left"></button>
      <button type="button" class="right" id="guide_right"></button>
    </div>
  `,
  run: ui => {
    moveEvent(ui.guide_top, 0, y)
    moveEvent(ui.guide_bottom, 0, -y)
    moveEvent(ui.guide_left, x)
    moveEvent(ui.guide_right, -x)
  }
})
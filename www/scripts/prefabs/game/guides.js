import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import Join from '../layout/join.js'

const moveEvent = (el, dir) => {
  el.addEventListener('focus', () => jngl.Map.scroll(dir, true))
  el.addEventListener('blur', () => jngl.Map.scroll(dir, false))
  el.addEventListener('mouseenter', () => jngl.Map.scroll(dir, true))
  el.addEventListener('mouseout', () => jngl.Map.scroll(dir, false))
}
export default () => nggt.create({
  template: `
    <div class="guides">
      <button type="button" class="top" id="guide_top"></button>
      <button type="button" class="bottom" id="guide_bottom"></button>
      <button type="button" class="left" id="guide_left"></button>
      <button type="button" class="right" id="guide_right"></button>
    </div>
  `,
  run: ui =>
    ['top', 'bottom', 'left', 'right'].forEach(dir =>
      moveEvent(ui[`guide_${dir}`], dir))
})
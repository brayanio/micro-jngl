import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import AbilityBtn from './ability-btn.js'
import Container from '../layout/container.js'

// const select = i => {
//   const elAr = document.querySelectorAll(`.sel${i}`)
//   elAr.forEach(el => {
//     const id = el.getAttribute('game')
//     jngl.Sprite.select(id)
//   })
// }

// const focus = () => {
//   let selected = jngl.Core.selectedSprites().val()
//   if(selected.length > 0)
//     jngl.Map.focusSprite(selected[0])
// }

export default () => nggt.create({
  template: Container('div', ['grid'],
    AbilityBtn('A1', 'q', () => {}),
    AbilityBtn('A2', 'w', () => {}),
    AbilityBtn('A3', 'e', () => {}),
    AbilityBtn('A4', 'r', () => {})
  )
})
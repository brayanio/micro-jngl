import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import AbilityBtn from './ability-btn.js'
import Container from '../layout/container.js'

export default () => nggt.create({
  template: Container('div', ['grid'],
    AbilityBtn('Sel 1', '1', () => jngl.Sprite.select('player')),
    AbilityBtn('Sel 2', '2', () => {}),
    AbilityBtn('Sel 3', '3', () => {}),
    AbilityBtn('Sel 4', '4', () => {}),
    AbilityBtn('Ability 1', 'q', () => {}),
    AbilityBtn('Ability 2', 'w', () => {}),
    AbilityBtn('Ability 3', 'e', () => {}),
    AbilityBtn('Ability 4', 'r', () => {}),
    AbilityBtn('Attack', 'a', () => {}),
    AbilityBtn('Stop', 's', () => {}),
    AbilityBtn('Deselect', 'd', () => {}),
    AbilityBtn('Interact', 'f', () => {})
  )
})
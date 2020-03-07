import nggt from '../../nggt.js'
import Join from './join.js'

export default (el, classList, ...args) => Join(
  `<${el} class="${classList.join(' ')}">`,
    ...args,
  `</${el}>`
)
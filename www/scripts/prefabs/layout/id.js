import nggt from '../../nggt.js'
import Join from './join.js'

export default (el, id, classList, ...args) => Join(
  `<${el} id="${id}" class="${classList.join(' ')}">`,
    ...args,
  `</${el}>`
)
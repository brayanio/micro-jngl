import nggt from '../../nggt.js'
import Join from './join.js'

export default (el, ...args) => Join(
  `<${el}>`,
    ...args,
  `</${el}>`
)
import nggt from '../../nggt.js'
import El from './el.js'
import Join from './join.js'

export default (...args) => El('ul',
  ...(args.map(html => El('li', html)))
)
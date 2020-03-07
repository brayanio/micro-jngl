import nggt from '../../nggt.js'
import Container from './container.js'

const col = (i, comp) => `
  <div class="d${i}">
    ${comp}
  </div>
`

export default (...args) => {
  let sizes = args.slice(0, args.length / 2),
      comps = args.slice(args.length / 2)

  return Container('div', ['drow'], 
    ...comps.map((comp, i) => col(sizes[i], comp))
  )
}
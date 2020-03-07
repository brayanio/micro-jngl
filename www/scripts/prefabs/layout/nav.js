import nggt from '../../nggt.js'
import Container from './container.js'

export default (...args) => 
  Container('nav', [], ...args.map(a => `<a href="#/${a.toLowerCase()}">${a}</a>`))

// <nav>
//   <a href="#/cookbook">Cookbook</a>
// </nav>
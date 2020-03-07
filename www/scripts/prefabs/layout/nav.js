import nggt from '../../nggt.js'

export default (...args) => {
  let template = '<nav>'
  args.forEach(a => template += `<a href="#/${a.toLowerCase()}">${a}</a>`)
  template += '</nav>'
  return nggt.create({ template })
}

// <nav>
//   <a href="#/cookbook">Cookbook</a>
// </nav>
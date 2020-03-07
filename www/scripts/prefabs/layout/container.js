import nggt from '../../nggt.js'

export default (el, classList, ...args) => {
  let template = `<${el} class="${classList.join(' ')}">`
  args.forEach(a => template += a)
  template += `</${el}>`
  return nggt.create({ template })
}
import nggt from '../../nggt.js'

const col = (i, comp) => nggt.create({
  template: `
    <div class="d${i}">
      ${comp}
    </div>
  `
})

export default (...args) => {
  let sizes = args.slice(0, args.length / 2),
      comps = args.slice(args.length / 2)
  let template = '<div class="drow">'
  comps.forEach((comp, i) => template += col(sizes[i], comp))
  template += '</div>'
  return nggt.create({ template })
}
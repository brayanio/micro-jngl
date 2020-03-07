import nggt from '../nggt.js'
import Header from '../prefabs/layout/header.js'

export default () => nggt.create({
  isRoot: true,
  classList: ['lobby'],
  data: {},
  template: `
    ${Header('JNGL', 'Micro')}
  `
})
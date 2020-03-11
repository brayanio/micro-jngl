import nggt from '../../nggt.js'
import render from '../../render.js'
import Join from '../layout/join.js'

export default (map, ...template) => {
  render.registerMap(map)

  return `
    <div class="map" game="map">
      ${Join(...template)}
    </div>
  `
}
import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import Join from '../layout/join.js'

export default (map, ...template) => {
  return `
    <div class="map" id="map" game="map">
      ${Join(...template)}
    </div>
  `
}
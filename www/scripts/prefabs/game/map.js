import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import Join from '../layout/join.js'

export default (map, ...template) => {
  jngl.Map.register(map)

  return `
    <div class="map" id="map" game="map">
      ${Join(...template)}
    </div>
  `
}
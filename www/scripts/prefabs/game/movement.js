import nggt from '../../nggt.js'
import jngl from '../../jngl.js'
import Join from '../layout/join.js'
import Sprite from './sprite.js'

export default (ap) => {
  const temp = (i, ...str) => `
    <div id="move${i}"> 
      <span class="top">${i}</span> 
      <span class="bottom">${i}</span> 
      <span class="left">${i}</span> 
      <span class="right">${i}</span> 
      ${Join(...str)} 
    </div>
  `
  let template
  for(let i = 0; i < ap; i++)
    template = temp(i, template || '')

  return `
    <button class="move-template" id="moveTemp">
      ${template}
    </button>
  `
}
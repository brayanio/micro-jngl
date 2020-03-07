import gui from '../../gui.js'

export default props => gui.sprite({
  classList: ['card', 'hidden'],
  template: `
    <strong>Units</strong>
    <hr>
    <p>Coming Soon...</p>
  `,
  onload: [[], (ul, el) => 
    props.tabSubs.push(tab => {
      if(tab === 'unit')
        el.classList.remove('hidden')
      else
        el.classList.add('hidden')
    })
  ],
  append: props
})
import gui from '../../gui.js'

export default props => gui.sprite({
  classList: ['card'],
  template: `
    <strong>Heros</strong>
    <hr>
    <p>Coming Soon...</p>
  `,
  onload: [[], (ul, el) => 
    props.tabSubs.push(tab => {
      if(tab === 'hero')
        el.classList.remove('hidden')
      else
        el.classList.add('hidden')
    })
  ],
  append: props
})
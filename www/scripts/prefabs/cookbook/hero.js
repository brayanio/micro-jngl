import nggt from '../../nggt.js'

export default () => nggt.create({
  template: `
    <div class="card" id="container">
      <strong>Heros</strong>
      <hr>
    </div>
  `,
  run: (ui, data) => {
    data.tab.onChange(tab => {
      if(tab === 'hero')

    })
  }
})
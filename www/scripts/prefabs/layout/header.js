import nggt from '../../nggt.js'
import Join from './join.js'

export default (title, micro) => {
  let interval
  return nggt.create({
    template: `
      <strong>Welcome to the</strong>
      <h1 class="header">
        <small id="micro" class="micro">${micro}</small>
        <span>${title}</span>
      </h1>
    `,
    run: (ui, data, el) => {
      let text = micro
      let reverse = true
      let index = text.length
      interval = setInterval(()=>{
        let title = ui.micro.innerText
        if(!reverse)
          ui.micro.innerHTML = Join(title.substr(1), text[index++]) 
        else {
          ui.micro.innerHTML = Join(
            '&nbsp;',
            title.substr(0, text.length - 1),
          )
          index--
        }
        if(index >= text.length || index <= 0)
          reverse = !reverse
      }, Math.random() * 400 + 200)
    },
    cleanup: () => clearInterval(interval)
  })
}
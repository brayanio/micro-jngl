import nggt from '../../nggt.js'

export default (title, micro) => {
  let interval
  return nggt.create({
    template: `
      <strong>Welcome to the</strong>
      <h1>
        <small id="micro" class="micro">${micro}</small>
        <span>${title}</span>
      </h1>
    `,
    run: (ui, data, el) => {
      let text = micro
      let reverse = true
      let title = ui.micro
      let index = text.length
      interval = setInterval(()=>{
        if(!reverse) {
          title.innerText = title.innerText.substr(1)
          title.innerText += text[index++]
        } else {
          title.innerText = title.innerText.substr(0, title.innerText.length - 1)
          title.innerHTML = `&nbsp;${title.innerText}`
          index--
        }
        if(index >= text.length || index <= 0)
          reverse = !reverse
      }, Math.random() * 400 + 200)
    },
    cleanup: () => clearInterval(interval)
  })
}
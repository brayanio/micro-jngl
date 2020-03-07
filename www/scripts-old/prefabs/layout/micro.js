import gui from '../../gui.js'

export default (text, interval, reverse) => {
  let title = gui.grab('#micro')
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
}
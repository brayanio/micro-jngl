import gui from '../../gui.js'

export default (interval, index, reverse) => {
  let title = gui.grab('#micro')
  interval = setInterval(()=>{
    if(!reverse) {
      title.innerText = title.innerText.substr(1)
      title.innerText += 'cook'[index++]
    } else {
      title.innerText = title.innerText.substr(0, title.innerText.length - 1)
      title.innerHTML = `&nbsp;${title.innerText}`
      index--
    }
    if(index >= 'cook'.length || index <= 0)
      reverse = !reverse
  }, Math.random() * 400 + 250)
}
import gui from '../gui.js'

export default {
  run: () => {
    let container = gui.sprite({
      classList: ['lobby']
    })

    container.el.innerHTML = `
      <strong>Welcome to the</strong>
      <h1>JNGL</h1>
      <div class="rooms">
        <strong>No Rooms Available</strong>
      </div>
      <button class="lobby-menubtn">Create Room</button>
    `

    document.body.appendChild(container.el)
  },
  clearnup: () => {

  } 
}
import gui from '../../gui.js'

export default (room, father) => {
  let props = { classList: ['room-card'] }
  if(father) props.append = father

  const card = gui.sprite(props)

  card.el.innerHTML = `
    <div>
      <strong>Name: ${room.meta.name || room.meta.id}</strong>
      <br>
      <span>Host: ${room.meta.host || 'Grimlic'}</span>
      <br>
      <small>Players: ${room.meta.players.length}/6</small>
    </div>
    <button>Join</button>
  `

  return card
}
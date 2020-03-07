import nggt from '../../nggt.js'

export default room => `
  <div class="room-card">
    <div>
      <strong>Name: ${room.meta.name || room.meta.id}</strong>
      <br>
      <span>Host: ${room.meta.host || 'Grimlic'}</span>
      <br>
      <small>Players: ${room.meta.players.length}/6</small>
    </div>
    <button>Join</button>
  </div>
`
import nggt from '../../nggt.js'
import Room from '../../services/room.js'

export default room => nggt.create({
  template: `
    <div class="room-card">
      <div>
        <strong>Name: ${room.meta.name || room.meta.id}</strong>
        <br>
        <span>Host: ${room.meta.host || 'Grimlic'}</span>
        <br>
        <small>Players: ${room.meta.players.length}/6</small>
      </div>
      <button id="join">Join</button>
    </div>
  `,
  auto: async (ui, data) => ui.join.addEventListener('click', () =>Room.joinRoom(room))
})
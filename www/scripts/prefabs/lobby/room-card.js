import nggt from '../../nggt.js'
import Room from '../../services/room.js'
import authService from '../../services/auth.js'

export default room => {
  let authSub
  return nggt.create({
    template: `
      <div class="room-card">
        <div>
          <strong>Host: ${room.meta.host.username}</strong>
          <br>
          <small>Players: ${room.meta.players.length}/6</small>
        </div>
        <button id="join" class="hidden">Join</button>
      </div>
    `,
    auto: async (ui, data) => {
      if(ui.join){
        ui.join.addEventListener('click', () => Room.joinRoom(room))
        authSub = authService.service.profile.onChange(profile => {
          if(profile && profile.username)
            ui.join.classList.remove('hidden')
        })
      }
    },
    cleanup: () => {
      if(authSub)
        authSub.cleanup()
      authSub = null
    }
  })
}
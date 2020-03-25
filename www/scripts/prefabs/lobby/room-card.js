import nggt from '../../nggt.js'
import Room from '../../services/room.js'
import authService from '../../services/auth.js'
import Layout from '../layout/module.js'

export default room => {
  let authSub
  return nggt.create({
    template: Layout.Container('div', ['room-card'],
      Layout.El('div',
        Layout.Bold(`Host: ${room.meta.host.username}`),
        '<br>',
        Layout.El('small', `Players: ${room.meta.players.length}/6`)
      ),
      Layout.Id('button', 'join', ['hidden'], 'Join')
    ),
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
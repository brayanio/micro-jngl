import nggt from '../nggt.js'
import Prefabs from '../prefabs/module.js'
import roomService from '../services/room.js'
import authService from '../services/auth.js'

const admin = {username: 'admin', password: 'admin', email: 'admin'}

export default () => {
  let login = nggt.dataObj(false)

  let authSub
  return nggt.create({
    isRoot: true,
    classList: ['lobby'],
    template: Prefabs.Join(
      Prefabs.Container('div', ['exit-btn'],
        Prefabs.IconBtn('close', () => fetch('http://localhost:4404'))
      ),
      Prefabs.ColGrid(3, 7, 
        Prefabs.Sidebar('Micro', 'JNGL', [
            ['Cookbook', '#/cookbook']
          ], 
          Prefabs.Id('div', 'login', [], 
            Prefabs.LinkBtn('Login', () => login.change(true)),
            Prefabs.LinkBtn('Admin Login', () => authService.login(admin.username, admin.password))
          ),
          Prefabs.Id('div', 'profileControls', ['hidden'],
            Prefabs.LinkBtn('Refresh', () => roomService.getOpenRooms()),
            Prefabs.LinkBtn('Create Room', () => roomService.newRoom()),
            Prefabs.LinkBtn('Clear Rooms', () => roomService.clearRooms())
          )
        ),
        Prefabs.RoomView()
      ),
      Prefabs.Login(login)
    ),
    run: ui => {
      let safety = false
      authSub = authService.service.profile.onChange(profile => {
        if(profile && profile.username){
          ui.login.classList.add('hidden')
          ui.profileControls.classList.remove('hidden')
        } else if(profile && profile.error && !login.val() && !safety) {
          authService.signup(admin.username, admin.password, admin.email)
          safety = true
        }
      })
    },
    cleanup: () => {
      authSub.cleanup()
    }
  })
}
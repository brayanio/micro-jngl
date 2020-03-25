import nggt from '../nggt.js'

const authService = nggt.service({
  profile: nggt.dataObj()
})

const signup = async (username, password, email) => {
  await authService.read('profile', 'signup', {username, password, email})
  return authService.profile
}

const login = async (username, password) => {
  await authService.read('profile', 'login', {username, password})
  return authService.profile
}

const profile = () => authService.profile.val()

export default { signup, login, service: authService, profile }
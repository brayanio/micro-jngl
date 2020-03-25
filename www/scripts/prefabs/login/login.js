import nggt from '../../nggt.js'
import Layout from '../layout/module.js'
import authService from '../../services/auth.js'

const modalOptions = {closeOnClick: true, classList: ['login'], ui: 'loginModal'}

const signupFn = () => {
  let auth = authObj.val()
  console.log(auth)
  if(auth.username.length > 4)
    if(auth.confirm === auth.password)
      if(auth.password.length > 4)
        if(auth.email.length > 0)
          authService.signup(
            auth.username,
            auth.password,
            auth.email
          )
}

const authObj = nggt.dataObj({username: '', password: '', confirm: '', email: ''})
const state = nggt.dataObj('login')
let stateSub, authSub
export default (dataObj) => nggt.create({
  template: Layout.Modal(dataObj, modalOptions,
    Layout.IconBtn('close', () => dataObj.change(false)),
    Layout.ColGrid(4, 6, 
      Layout.Container('div', ['center-all'],
        Layout.Header('JNGL', 'Micro') 
      ),
      Layout.Container('form', [], 
        Layout.El('label',
          Layout.Bold('Username'),
          `<input id="username">`
        ),
        Layout.El('label',
          Layout.Bold('Password'),
          `<input type="password" id="pass">`
        ),
        Layout.Id('div', 'signupOptions', ['hidden'], 
          Layout.El('label',
            Layout.Bold('Confirm'),
            `<input type="password" id="confirmPass" placeholder="password">`
          ),
          Layout.El('label',
            Layout.Bold('Email'),
            `<input type="email" id="email">`
          )
        ),
        Layout.Id('div', 'error', ['error-msg', 'hidden']),
        Layout.Container('div', ['right'],
          Layout.Id('span', 'login', [],
            Layout.LinkBtn('Login', () => authService.login(authObj.val().username, authObj.val().password))
          ),
          Layout.Id('span', 'signup', [],
            Layout.LinkBtn('Sign Up', () => signupFn())
          )
        )
      )
    ),
    Layout.Id('div', 'createProfile', [], 
      Layout.Bold('New?'),
      '<br>',
      Layout.LinkBtn('Create Profile', () => state.change('signup')),
    ),
    Layout.Id('div', 'loginProfile', [],
      Layout.Bold('Already have an account?'),
      '<br>',
      Layout.LinkBtn('Login', () => state.change('login'))
    )
  ),
  run: (ui, data) => {
    ui = { ...ui, ...data.val().loginModal }
    stateSub = state.onChange(val => {
      if(val === 'login'){
        ui.signupOptions.classList.add('hidden')
        ui.signup.classList.add('hidden')
        ui.login.classList.remove('hidden')
        ui.createProfile.classList.remove('hidden')
        ui.loginProfile.classList.add('hidden')
      } else {
        ui.signupOptions.classList.remove('hidden')
        ui.login.classList.add('hidden')
        ui.signup.classList.remove('hidden')
        ui.createProfile.classList.add('hidden')
        ui.loginProfile.classList.remove('hidden')
      }
    })
    ui.username.addEventListener('change', 
      () => authObj.change(obj => obj.username = ui.username.value))
    ui.pass.addEventListener('change', 
      () => authObj.change(obj => obj.password = ui.pass.value))
    ui.confirmPass.addEventListener('change', 
      () => authObj.change(obj => obj.confirm = ui.confirmPass.value))
    ui.email.addEventListener('change', 
      () => authObj.change(obj => obj.email = ui.email.value))

    authSub = authService.service.profile.onChange(profile => {
      if(profile === undefined) return null
      if(profile.error){
        ui.error.innerText = profile.error
        if(!ui.error.classList.contains('hidden')){
          ui.error.classList.add('attempt')
          setTimeout(() => {
            if(ui.error)
              ui.error.classList.remove('attempt')
          }, 295)
        }
        ui.error.classList.remove('hidden')
        return console.error(`Auth Error: ` + profile.error)
      }
      else 
        dataObj.change(false)
    })
  },
  cleanup: () => {
    stateSub.cleanup()
    authSub.cleanup()
  }
})
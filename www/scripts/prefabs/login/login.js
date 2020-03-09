import nggt from '../../nggt.js'
import Layout from '../layout/module.js'
import authService from '../../services/auth.js'

const modalOptions = {closeOnClick: true, classList: ['login'], ui: 'loginModal'}

const authObj = nggt.dataObj({username: '', password: '', confirm: '', email: ''})
const state = nggt.dataObj('login')
let stateSub
export default (dataObj) => nggt.create({
  template: Layout.Modal(dataObj, modalOptions,
    Layout.IconBtn('close', () => dataObj.change(false)),
    Layout.ColGrid(4, 6, 
      Layout.Container('div', ['center-all'],
        Layout.Header('JNGL', 'Micro') 
      ),
      Layout.Container('form', [], `
        <label>
          <strong>Username</strong>
          <input id="username">
        </label>
        <label>
          <strong>Password</strong>
          <input type="password" id="pass">
        </label>
        <label class="hidden" id="confirm">
          <strong>Confirm</strong>
          <input type="password" id="confirmPass" placeholder="password">
        </label>
        <label class="hidden" id="emailLbl">
          <strong>Email</strong>
          <input type="email" id="email">
        </label>
        <div id="error" class="error-msg hidden"></div>
        `,
        Layout.Container('div', ['right'],
          `<span id="login">`,
            Layout.LinkBtn('Login', () => authService.login(...Object.values(authObj.val()))),
          `</span>`,
          `<span id="signup">`,
            Layout.LinkBtn('Sign Up', () => {
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
            }),
          `</span>`
        )
      )
    ),
    Layout.Join('<div id="createProfile">',
      `<strong>New?</strong><br>`,
      Layout.LinkBtn('Create Profile', () => state.change('signup')),
    `</div>`,
    '<div id="loginProfile">',
      `<strong>Already have an account?</strong><br>`,
      Layout.LinkBtn('Login', () => state.change('login')),
    `</div>`,
    )
  ),
  run: (ui, data) => {
    ui = { ...ui, ...data.val().loginModal }
    stateSub = state.onChange(val => {
      if(val === 'login'){
        ui.confirm.classList.add('hidden')
        ui.signup.classList.add('hidden')
        ui.login.classList.remove('hidden')
        ui.emailLbl.classList.add('hidden')
        ui.createProfile.classList.remove('hidden')
        ui.loginProfile.classList.add('hidden')
      } else {
        ui.confirm.classList.remove('hidden')
        ui.login.classList.add('hidden')
        ui.signup.classList.remove('hidden')
        ui.emailLbl.classList.remove('hidden')
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

    authService.service.profile.onChange(profile => {
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
      else {
        dataObj.change(false)
        console.log(profile)
      }
    })
  },
  cleanup: () => {
    state.cleanup(stateSub)
  }
})
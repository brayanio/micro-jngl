import nggt from '../../nggt.js'
import Layout from '../layout/module.js'

const modalOptions = {closeOnClick: true, classList: ['login'], ui: 'loginModal'}

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
        `,
        Layout.Container('div', ['right'],
          `<span id="login">`,
            Layout.LinkBtn('Login', () => {}),
          `</span>`,
          `<span id="signup">`,
            Layout.LinkBtn('Sign Up', () => {}),
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
  },
  cleanup: () => {
    state.cleanup(stateSub)
  }
})
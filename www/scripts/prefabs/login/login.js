import nggt from '../../nggt.js'
import Layout from '../layout/module.js'

const modalOptions = {closeOnClick: true, classList: ['login']}
export default (dataObj) => nggt.create({
  template: Layout.Modal(dataObj, modalOptions,
    Layout.ColGrid(4, 6, 
      Layout.Container('div', ['center-all'],
        Layout.Header('JNGL', 'Micro') 
      ),
      Layout.Container('form', [], `
        <label>
          <strong>Username</strong>
          <input>
        </label>
        <label>
          <strong>Password</strong>
          <input>
        </label>
        `,
        Layout.Container('div', ['right'],
          Layout.LinkBtn('Login', () => {})
        )
      )
    ),
    Layout.Container('div', [],
      `<strong>New?</strong><br>`,
      Layout.LinkBtn('Create Profile', () => {})
    )
  )
})
import nggt from '../../nggt.js'
import Join from './join.js'

export default (dataObj, options, ...args) => {
  let sub, classList = options.classList || []
  return nggt.create({
    template: `
      <div id="modal" class="modal-bg">
        <div class="modal card ${classList.join(' ')}">
          ${Join(...args)}
        </div>
      </div>
    `,
    run: (ui, data) => {
      if(options.ui) data.change(obj => obj[options.ui] = ui)
      if(options.closeOnClick)
        ui.modal.addEventListener('click', e => {
          if(e.target === ui.modal)
            dataObj.change(false)
        })
      sub = dataObj.onChange(val => {
        if(val)
          ui.modal.classList.remove('hidden')
        else
          ui.modal.classList.add('hidden')
      })
    },
    cleanup: () => {
      dataObj.cleanup(sub)
    }
  })
}
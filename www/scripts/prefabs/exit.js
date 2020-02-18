import btn from './btn.js'

export default text => {
    let button = btn( text || 'Exit', () => {
        fetch('http://localhost:4404')
        button.el.classList.add('disabled')
        button.el.setAttribute('disabled', true)
    })
    return button
}
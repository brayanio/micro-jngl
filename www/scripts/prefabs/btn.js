import gui from '../gui.js'

export default (text, fn, props) => {

    let btn = gui.sprite(Object.assign({
        el: 'button',
        text: text,
        classList: ['btn']
    }, props || {}))

    btn.on('click', fn)
    return btn
}
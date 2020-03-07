import gui from '../gui.js'

export default (text, fn, props) => {
    props = props || {}

    let btn = gui.sprite(Object.assign({
        el: 'button',
        text: text,
        classList: ['btn']
    }, props.btn))

    if(props.hotkey)
        btn.hotkey = gui.sprite({
            el: 'span',
            text: props.hotkey,
            classList: ['hotkey'],
            append: btn
        })

    btn.on('click', fn)
    return btn
}
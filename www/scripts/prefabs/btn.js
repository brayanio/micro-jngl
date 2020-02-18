import gui from '../gui.js'

export default (text, fn, props) => {

    let btn = gui.sprite(Object.assign({
        el: 'button',
        text: text,
        classList: ['btn'],
        bounds: {x: 100, y: 100, w: 100, h: 30}
    }, props || {}))

    btn.on('click', fn)
    return btn

}
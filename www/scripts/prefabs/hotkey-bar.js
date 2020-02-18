import gui from '../gui.js'

import btn from './btn.js'

export default () => {
    let bar = gui.sprite({
        classList: ['hotkey-bar'],
        bounds: {x: 1, y: 88, w: 8 * 6, h: 8}
    })


    let hotkeys = []
    const setHotKeys = (ar) => {
        ar.forEach((a, i) => {
            let button = a.el
            ? a
            : btn(...a, {bounds : null})
            hotkeys.push(button)
            bar.el.appendChild(button.el)
        })
    }

    return Object.assign(bar, { setHotKeys })
}
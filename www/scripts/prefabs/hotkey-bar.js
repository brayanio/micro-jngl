import gui from '../gui.js'
import controller from '../controller.js'

import btn from './btn.js'

export default () => {
    let bar = gui.sprite({
        classList: ['hotkey-bar'],
        bounds: {x: 1, y: 90, w: 8 * 6, h: 8}
    })

    let hotkeys = []
    const setHotKeys = (ar) => {
        for(let i = 0; i < 6; i++)
            controller.removeAction(i+1, `hotkey${i}`)
        ar.forEach((a, i) => {
            let button = a.el
            ? a //if is a button
            : btn(...a, {bounds : null, hotkey: i+1}) // else make a button
            controller.onaction(i+1, `hotkey${i}`, () => button.el.click())
            hotkeys.push(button)
            bar.el.appendChild(button.el)
        })
    }

    return Object.assign(bar, { setHotKeys })
}
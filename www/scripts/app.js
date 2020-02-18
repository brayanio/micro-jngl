import gui from './gui.js'
import prefabs from './prefabs.js'

import controller from './controller.js'

const exit = prefabs.exit()

const player = gui.sprite({
    el: 'button',
    classList: ['circle'],
    bounds: {x: 10, y: 300, w: 60, h: 60}
})

const map = gui.map(1920, 1080, [exit, player])

controller.listen()

let speed = 8
controller.onloop((dt, dir) => {
    if(dir.w) player.move(0, -speed)
    if(dir.s) player.move(0, speed)
    if(dir.a) player.move(-speed, 0)
    if(dir.d) player.move(speed, 0)
})
import gui from '../gui.js'

export default () => {
    const player = gui.sprite({
        el: 'button',
        classList: ['circle'],
        bounds: {x: 1, y: 30, w: 10, h: 10}
    })
    let speed = 2

    const checkbounds = () => {
        if(player.bounds.x > 400 - player.bounds.w)
            player.bounds.x = 400 - player.bounds.w
        if(player.bounds.x < 0)
            player.bounds.x = 0
        if(player.bounds.y > 300 - player.bounds.h)
            player.bounds.y = 300 - player.bounds.h
        if(player.bounds.y < 0)
            player.bounds.y = 0
    }
    player.checkbounds = checkbounds

    const onloop = (dir) => {
        if(dir.w) player.move(0, -speed)
        if(dir.s) player.move(0, speed)
        if(dir.a) player.move(-speed, 0)
        if(dir.d) player.move(speed, 0)
    }
    player.onloop = onloop

    return player
}
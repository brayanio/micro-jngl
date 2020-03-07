import gui from '../gui.js'

export default props => {
    props = props || {}
    const enemy = props.enemy
    const player = gui.sprite({
        el: 'button',
        classList: [enemy ? 'enemy' : 'circle', 'circle'],
        bounds: props.bounds || {x: 1, y: 30, w: 10, h: 10}
    })
    let speed = 1

    const checkbounds = (mapW, mapH) => {
        if(player.bounds.x > mapW - player.bounds.w)
            player.bounds.x = mapW - player.bounds.w
        if(player.bounds.x < 0)
            player.bounds.x = 0
        if(player.bounds.y > mapH - player.bounds.h)
            player.bounds.y = mapH - player.bounds.h
        if(player.bounds.y < 0)
            player.bounds.y = 0
    }
    player.checkbounds = checkbounds

    const onloop = (dir, mapW, mapH) => {
        if(dir.w) player.move(0, -speed)
        if(dir.s) player.move(0, speed)
        if(dir.a) player.move(-speed, 0)
        if(dir.d) player.move(speed, 0)
        checkbounds(mapW, mapH)
    }
    player.onloop = onloop

    return player
}
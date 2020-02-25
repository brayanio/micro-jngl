import gui from '../gui.js'

export default (vpw, vph, w, h) => {
    const entity = gui.sprite({
        classList: ['map'],
        bounds: gui.rect(0, 0, w, h)
    })
    const hud = gui.sprite({ 
        classList: ['hud'] ,
        bounds: gui.rect(0, 0, vpw, vph)
    })

    let sprites = [], hudSprites = []
    const addSprite = (...s) => {
        sprites.concat(s)
        console.log(s)
        s.forEach(l => entity.el.appendChild(l.el))
    }
    const addHUD = (...s) => {
        s.forEach(s => {
            hudSprites.push(s)
            hud.el.appendChild(s.el)
        })
    }

    sprites.forEach(addSprite)

    const focusSprite = s => {
        let r = entity.bounds
        r.x = -(s.bounds.x - vpw / 2) - s.bounds.w / 2
        r.y = -(s.bounds.y - vph / 2) - s.bounds.h / 2
        entity.draw()
    }

    entity.el.appendChild(hud.el)
    document.body.appendChild(entity.el)
    return Object.assign(entity, { addHUD, addSprite, focusSprite })
}
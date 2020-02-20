const rect = (x, y, w, h) => { return {x, y, w, h} }

const sprite = props => {
    props = props || {}
    const el = document.createElement(props.el || 'div')
    el.classList.add('sprite')
    if(props.classList)
        el.classList.add(...props.classList)
    if(props.text)
        el.innerText = props.text

    const draw = () => { 
        bounds.x = bounds.x || 0
        bounds.y = bounds.y || 0
        bounds.w = bounds.w || 0
        bounds.h = bounds.h || 0 
        el.style.left = bounds.x + 'vw'
        el.style.top = bounds.y + 'vh'
        el.style.width = bounds.w + 'vw'
        el.style.height = bounds.h + 'vh'
    }

    let bounds = props.bounds || rect(0, 0, 10, 10)
    if(props.bounds)
        draw()
        
    const setBounds = rec => { 
        if(rec.x) bounds.x = rec.x
        if(rec.y) bounds.y = rec.y
        if(rec.w) bounds.w = rec.w
        if(rec.h) bounds.h = rec.h
        draw()
    }
    const move = (x, y) => setBounds(Object.assign(bounds, {x: bounds.x + x, y: bounds.y + y}))
    const resize = (w, h) => setBounds(Object.assign(bounds, {w, h}))

    let avatarEl
    const avatar = src => {
        if(!avatarEl){
            avatarEl = document.createElement('img')
            el.appendChild(avatarEl)
        }
        avatarEl.src = src
        return { el: avatarEl, src }
    }

    const on = (e, fn) => el.addEventListener(e, ev => fn(ev, el))

    if(props.avatar)
        avatar(props.avatar)
    return { el, avatar, setBounds, on, move, resize, bounds, draw }
}

const map = (vpw, vph, w, h) => {
    const entity = sprite({
        classList: ['map'],
        bounds: rect(0, 0, w, h)
    })
    const hud = sprite({ 
        classList: ['hud'] ,
        bounds: rect(0, 0, vpw, vph)
    })

    let sprites = [], hudSprites = []
    const addSprite = s => {
        sprites.push(s)
        entity.el.appendChild(s.el)
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
        r.x = -(s.bounds.x - vpw / 2)
        r.y = -(s.bounds.y - vph / 2)
        entity.draw()
    }

    entity.el.appendChild(hud.el)
    document.body.appendChild(entity.el)
    return Object.assign(entity, { sprites, addHUD, addSprite, focusSprite })
}

export default { map, sprite }
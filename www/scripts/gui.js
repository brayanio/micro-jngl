const unit = 'px'

const rect = (x, y, w, h) => { return {x, y, w, h} }

const sprite = props => {
    props = props || {}
    const el = document.createElement(props.el || 'div')
    el.classList.add('sprite')
    if(props.classList)
        el.classList.add(...props.classList)
    if(props.text)
        el.innerText = props.text

    let bounds 
    const setBounds = rec => { 
        bounds = rec 
        el.style.left = bounds.x + unit
        el.style.top = bounds.y + unit
        el.style.width = bounds.w + unit
        el.style.height = bounds.h + unit
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

    const on = (...stuff) => el.addEventListener(...stuff)

    setBounds(props.bounds || rect(0, 0, 100, 28))
    if(props.avatar)
        avatar(props.avatar)
    return { el, avatar, setBounds, on, move, resize, bounds }
}

const map = (w, h, sprites) => {
    const entity = sprite({
        classList: 'map',
        bounds: rect(0, 0, w, h)
    })

    const addSprite = s => {
        sprites.push(s)
        entity.el.appendChild(s.el)
    }

    sprites = sprites || []
    sprites.forEach(addSprite)

    document.body.appendChild(entity.el)
    return Object.assign(entity, { sprites, addSprite })
}

export default { map, sprite }
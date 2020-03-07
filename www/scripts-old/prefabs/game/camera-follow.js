import btn from './btn.js'

export default (map, props) => {
    let isFollowing = false;
    let button = btn('Camera Follow', (e, el) => {
        isFollowing = !isFollowing
        if(isFollowing){
            map.el.classList.add('transition')
            setTimeout(() => map.el.classList.remove('transition'), 300)
        }
        el.classList[isFollowing ? 'add' : 'remove']('active')
    }, props)

    return Object.assign(button, {isFollowing: () => isFollowing});
}
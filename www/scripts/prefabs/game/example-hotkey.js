export default () => {
    return ['Ability', (e, el) => {
        el.classList.add('disabled')
        setTimeout(() => el.classList.remove('disabled'), Math.random() * 2000)
    }]
}
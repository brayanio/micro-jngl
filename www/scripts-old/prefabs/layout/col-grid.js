import gui from '../../gui.js'

export default (...cols) => {
  let template = '', out, container
  const column = n => template += `<div class="d${n}"></div>`
  cols.forEach(col => column(col))
  gui.onload(() => out = container.el.children.map(el => { return {el} }))
  container = gui.sprite({
    classList: ['drow'],
    template,
    out
  })
  return container
}


// example
/*

const colgrid = ColGrid(3, 7)
colgrid.out.layout(
  SideBar('JNGL', 'Micro', 'Cookbook', [RefreshBtn(), CreateBtn(), ClearBtn()]),
  RoomView()
)

*/
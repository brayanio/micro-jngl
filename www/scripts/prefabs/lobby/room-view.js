import nggt from '../../nggt.js'

import roomService from '../../services/room.js'

export default () => {
  let template = `
    <strong>No Rooms Available</strong>
    <hr>
  `
  
  return nggt.create({
    template: `
    <div class="rooms card" id="container">
      ${template}
    </div>
    `,
    run: async (ui, data) => {
      let openRooms = await roomService.data.openRooms()
      openRooms.onChange(rooms => {
        let html = template
        rooms.forEach(room => html += `<span>${room.meta.id}</span>`)
        ui.container.innerHTML = html
      })
    }
  })
}
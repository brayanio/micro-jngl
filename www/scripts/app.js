import gui from './gui.js'
import prefabs from './prefabs.js'

import controller from './controller.js'

let player = prefabs.player()
// MAP
const map = gui.map(100, 100, 400, 300)

// HUD
const hotkeyBar = prefabs.hotkeyBar()
const exit = prefabs.exit()
// const cameraFollow = prefabs.cameraFollow(map)

hotkeyBar.setHotKeys([prefabs.exampleHotkey(), prefabs.exampleHotkey(), prefabs.exampleHotkey(),
    prefabs.exampleHotkey(), prefabs.exampleHotkey(), exit])

// INIT
map.addSprite(player)
map.addHUD(hotkeyBar)
controller.listen()


controller.onloop((dt, dir) => {
    player.onloop(dir)
    // if(cameraFollow.isFollowing())
    map.focusSprite(player)
})
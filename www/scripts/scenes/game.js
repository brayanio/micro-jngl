import prefabs from './prefabs.js'
import controller from './controller.js'

export default {
  run: () => {
    // GAME CONSTANTS
    const MAP_WIDTH = 125
        , MAP_HEIGHT = 105

    // GAME SPRITES
    let player = prefabs.player()
    let enemy = prefabs.player({enemy: true, bounds: {x: 60, y: 60, w: 10, h: 10}})

    // MAP
    const map = prefabs.map(100, 100, MAP_WIDTH, MAP_HEIGHT)

    // HUD
    const hotkeyBar = prefabs.hotkeyBar()
    const exit = prefabs.exit()
    // const cameraFollow = prefabs.cameraFollow(map)

    hotkeyBar.setHotKeys([prefabs.exampleHotkey(), prefabs.exampleHotkey(), prefabs.exampleHotkey(),
        prefabs.exampleHotkey(), prefabs.exampleHotkey(), exit])

    // INIT
    map.addSprite(player, enemy)
    map.addHUD(hotkeyBar)
    controller.listen()

    controller.onloop((dt, dir) => {
        player.onloop(dir, MAP_WIDTH, MAP_HEIGHT)
        // if(cameraFollow.isFollowing())
        map.focusSprite(player)
    })
  },
  cleanup: () => {
    controller.endloop()
    map.cleanup()
  }
}
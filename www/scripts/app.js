import nggt from './nggt.js'
import render from './render.js'
import Lobby from './scenes/lobby.js'
import Cookbook from './scenes/cookbook.js'
import Room from './scenes/room.js'
import Game from './scenes/game.js'

render.setup(1200, 800)

nggt.router({
  '/': Lobby,
  'lobby': Lobby,
  'cookbook': Cookbook,
  'room': Room,
  'game': Game
})
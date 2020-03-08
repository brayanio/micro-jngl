import nggt from './nggt.js'
import Lobby from './scenes/lobby.js'
import Cookbook from './scenes/cookbook.js'
import Room from './scenes/room.js'

nggt.router({
  '/': Lobby,
  'lobby': Lobby,
  'cookbook': Cookbook,
  'room': Room
})
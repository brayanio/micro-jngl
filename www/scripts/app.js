import nggt from './nggt.js'
import Lobby from './scenes/lobby.js'
import Cookbook from './scenes/cookbook.js'

nggt.router({
  '/': Lobby,
  'lobby': Lobby,
  'cookbook': Cookbook
})
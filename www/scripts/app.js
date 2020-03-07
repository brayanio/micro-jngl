import nggt from './nggt.js'
import Lobby from './scenes/lobby.js'

nggt.router({
  '/': Lobby,
  '#/lobby': Lobby
})
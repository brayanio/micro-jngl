import Common from './common/module.js'
import Cookbook from './cookbook/module.js'
import Game from './game/module.js'
import Layout from './layout/module.js'
import Lobby from './lobby/module.js'
import Login from './login/module.js'

export default { 
  ...Common,  
  ...Cookbook,  
  ...Game,
  ...Layout, 
  ...Login, 
  ...Lobby 
}
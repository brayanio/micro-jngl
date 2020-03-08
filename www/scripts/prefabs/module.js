import Cookbook from './cookbook/module.js'
import Layout from './layout/module.js'
import Lobby from './lobby/module.js'
import Login from './login/module.js'

export default { 
  ...Cookbook, 
  ...Layout, 
  ...Login, 
  ...Lobby 
}
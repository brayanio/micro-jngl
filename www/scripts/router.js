import lobby from './scenes/lobby.js'
import cookbook from './scenes/cookbook.js'

const routes = {
  '/': lobby,
  'lobby': lobby,
  'cookbook': cookbook
}

let currentRoute
const checkRoute = () => {
  let routeName = location.hash
  if(routeName)
    routeName = routeName.substring(2)
  if(!routeName)
    routeName = '/'
  const route = routes[routeName]
  if(route){
    if(currentRoute)
      currentRoute.cleanup()
    currentRoute = route
    route.run()
  }
}

addEventListener('hashchange', () => checkRoute())
checkRoute()

export default {}
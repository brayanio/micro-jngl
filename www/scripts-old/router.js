import lobby from './scenes/lobby.js'
import cookbook from './scenes/cookbook.js'

const routes = {
  '/': lobby,
  'lobby': lobby,
  'cookbook': cookbook
}

let currentRoute, page
const checkRoute = () => {
  let routeName = location.hash
  if(routeName)
    routeName = routeName.substring(2)
  if(!routeName)
    routeName = '/'
  const route = routes[routeName]
  if(route && currentRoute !== route){
    if(page)
      page.el.classList.add('exit')
    setTimeout(async () => {
      if(currentRoute)
        currentRoute.cleanup()
      currentRoute = route
      page = await route.run()        
    }, 149)
  }
}

addEventListener('hashchange', () => checkRoute())
checkRoute()

export default {}
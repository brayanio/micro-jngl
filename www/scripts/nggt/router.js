import dataObj from './data-obj.js'

export default coreObj => {
  const router = (routes, child) => {
    const core = coreObj.val()
    let routeName = location.hash
    if(routeName)
      routeName = routeName.substring(2)
    if(!routeName)
      routeName = '/'
    const route = routes[routeName]
    if(route && core.currentRoute !== route){
      if(core.root)
        core.root.classList.add('exit')
      setTimeout(async () => {
        if(core.cleanupAr.length)
          core.cleanupAr.forEach(fn => fn())
        coreObj.change(obj => {
          obj.currentRoute = route
          obj.cleanupAr = []
          obj.cache = dataObj({})
          obj.root = document.createElement('div')
        })
        route()
      }, core.root ? 149 : 0)
    }
    if(!child) addEventListener('hashchange', () => router(routes, true))
  }
  return router
}
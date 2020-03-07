let root, currentRoute, cleanupAr = [], runAr = [], cache = {}

const router = (routes, child) => {
  let routeName = location.hash
  if(routeName)
    routeName = routeName.substring(2)
  if(!routeName)
    routeName = '/'
  const route = routes[routeName]
  if(route && currentRoute !== route){
    if(root)
      root.classList.add('exit')
    setTimeout(async () => {
      currentRoute = route
      if(cleanupAr.length)
        cleanupAr.forEach(fn => fn())
      cleanupAr = []
      cache = {}
      root = document.createElement('div')
      route()
    }, root ? 149 : 0)
  }
  if(!child) addEventListener('hashchange', () => router(routes, true))
}

const guid = (r, v) =>
  'nggtyyyyyxxxxxyx'.replace(/[xy]/g, c => 
    (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)).toString(16))

const create = props => {
  //props: run, cleanup, template, isRoot, classList
  let id = guid()

  const data = () => cache
  const onrun = () => {
    let ui = {}
    root.querySelectorAll(`[${id}]`).forEach(e => {
      ui[e.getAttribute(id)] = e
      e.removeAttribute(id)
    })
    props.run(ui, data)
  }

  props.template = props.template.split('id').join(id)

  if(props.cleanup)
    cleanupAr.push(props.cleanup)

  if(props.isRoot){
    if(props.data)
      cache = props.data
    root.classList.add(...props.classList)
    root.innerHTML = props.template
    setTimeout(() => {
      if(props.run)
        onrun()
      runAr.forEach(fn => fn())
      runAr = []
      document.body.appendChild(root)
      cleanupAr.push(() => document.body.removeChild(root))
    }, 0)
    return 
  } else if(props.run)
      runAr.push(onrun)

  return props.template
}

export default { router, create }
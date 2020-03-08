const guid = (r, v) =>
  'nggtyyyyyxxxxxyx'.replace(/[xy]/g, c => 
    (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)).toString(16))

export default (coreObj) => {
  return props => {
    //props: run, cleanup, template, isRoot, classList
    let id = guid()
    const core = coreObj.val()
    const data = () => core.cache
    const onrun = () => {
      let ui = {}
      core.root.querySelectorAll(`[${id}]`).forEach(e => {
        ui[e.getAttribute(id)] = e
        e.removeAttribute(id)
      })
      props.run(ui, data)
    }

    props.template = props.template.split('id="').join(id + '="')

    if(props.cleanup)
      core.cleanupAr.push(props.cleanup)

    if(props.isRoot){
      if(props.data)
        coreObj.change(obj => obj.cache = props.data)
      core.root.classList.add(...props.classList)
      core.root.innerHTML = props.template
      setTimeout(() => {
        if(props.run)
          onrun()
        core.runAr.forEach(fn => fn())
        coreObj.change(obj => obj.runAr = [])
        document.body.appendChild(core.root)
        coreObj.change(obj => 
          obj.cleanupAr.push(() => document.body.removeChild(core.root)))
      }, 0)
    } else if(props.run)
        coreObj.change(obj => obj.runAr.push(onrun))

    return props.template
  }
}
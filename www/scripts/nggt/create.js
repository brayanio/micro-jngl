const guid = (r, v) =>
  'nggtyyyyyxxxxxyx'.replace(/[xy]/g, c => 
    (r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)).toString(16))

export default (coreObj) => {
  return props => {
    //props: run, cleanup, template, isRoot, classList, auto, debug
    let id = guid()
    const core = coreObj.val()
    const data = core.cache
    const getUI = () => {
      let ui = {}
      core.root.querySelectorAll(`[${id}]`).forEach(e => {
        ui[e.getAttribute(id)] = e
        e.removeAttribute(id)
      })
      return ui
    }
    const onrun = () => {
      const ui = getUI()
      props.run(ui, data)
    }
    const onauto = () => setTimeout(() => {
      const ui = getUI()
      props.auto(ui, data)
    }, 15)

    props.template = props.template.split(' id="').join(` ${id}="`)

    if(props.cleanup)
      core.cleanupAr.push(props.cleanup)

    if(props.isRoot){
      core.root.classList.add(...props.classList)
      if(props.debug)
        console.log(props.template)
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
      else if(props.auto)
        onauto()

    return props.template
  }
}
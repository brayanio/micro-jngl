import Create from './nggt/create.js'
import Router from './nggt/router.js'
import Service from './nggt/service.js'
import DataObj from './nggt/data-obj.js'

let core = DataObj({
  root: null,
  currentRoute: null, 
  cleanupAr: [], 
  runAr: [], 
  cache: {}
})

let router = Router(core)
let create = Create(core)
let service = Service
let dataObj = DataObj

export default { router, create, service, dataObj }
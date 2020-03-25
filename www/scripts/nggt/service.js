import post from './post.js'
import dataObj from './data-obj.js'

export default data => {
  let read = async (name, path, body, log) => {
    const res = await post(path, body, log)
    if(!data[name])
      data[name] = dataObj(res)
    else
      data[name].change(res)
  }

  let send = async (path, body) => await post(path, body)

  return {...data, read, send} 
}
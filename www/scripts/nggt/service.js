import post from './post.js'
import dataObj from './data-obj.js'

export default data => {
  let read = async (name, path, body) => {
    const res = await post(path, body)
    if(!data[name])
      data[name] = dataObj(res)
    else
      data[name].change(res)
  }

  return {...data, read} 
}
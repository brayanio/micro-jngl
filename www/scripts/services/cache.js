import post from './post.js'

const dataObj = obj => {
  let subs = [];

  const onChange = fn => subs.push(fn) && fn(obj);
  const stop = () => subs = [];
  const val = () => obj;
  const update = () => subs.forEach(fn => fn(obj))

  const change = e => {
    (typeof e === 'function') ? e(obj) : obj = e;
    update();
    return obj;
  }

  return {change, onChange, update, val, stop}
}

let data = {}

let read = async (name, path, body) => {
  const res = await post(path, body)
  if(!data[name])
    data[name] = dataObj(res)
  else
    data[name].change(res)
}

export default () => { return {...data, read} }
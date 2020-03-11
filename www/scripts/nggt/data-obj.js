export default obj => {
  let subs = [];

  const cleanup = fn => subs = subs.filter(f => f !== fn)
  const onChange = fn => {
    subs.push(fn)
    fn(obj)
    return {cleanup: () => cleanup(fn)}
  }
  const stop = () => subs = [];
  const val = () => obj;
  const update = () => subs.forEach(fn => fn(obj))
  
  const change = e => {
    (typeof e === 'function') ? e(obj) : obj = e;
    update();
    return obj;
  }

  return {change, onChange, update, val, stop, cleanup}
}
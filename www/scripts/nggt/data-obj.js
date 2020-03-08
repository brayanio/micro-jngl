export default obj => {
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
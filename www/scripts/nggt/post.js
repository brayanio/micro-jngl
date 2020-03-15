const target = 'https://jngl-server--blbbrayan.repl.co/'
const fetchOptions = {
  method: 'POST', 
  headers: {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');


export default async (path, body) => {
  const options = Object.assign(fetchOptions, { body: toUrlEncoded(body) })
  let res = await fetch(target + path, options)
  let json = await res.json()
  return json
}
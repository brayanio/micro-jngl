const target = 'https://jngl-server--blbbrayan.repl.co/'
const fetchOptions = {
  method: 'POST', 
  headers: {
    'Access-Control-Allow-Origin':'*'
  }
}

export default async (path, body) => {
  console.log('post called')
  const options = Object.assign(fetchOptions, { body: JSON.stringify(body) })
  let res = await fetch(target + path, options)
  let json = await res.json()
  return json
}
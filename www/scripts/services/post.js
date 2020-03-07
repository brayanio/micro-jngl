const target = 'https://jngl-server--blbbrayan.repl.co/'

export default async (path, body) => {
  let res = await fetch(target + path, {
    method: 'POST', body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  })
  let json = await res.json()
  return json
}
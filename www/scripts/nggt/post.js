const target = 'https://jngl-server--blbbrayan.repl.co/'
const fetchOptions = {
  method: 'POST', 
  headers: {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function JSON_to_URLEncoded(element,key,list){
  var list = list || [];
  if(typeof(element)=='object'){
    for (var idx in element)
      JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
  } else {
    list.push(key+'='+encodeURIComponent(element));
  }
  return list.join('&');
}


export default async (path, body) => {
  console.log('[post]', path, body)
  const options = Object.assign(fetchOptions, { body: JSON_to_URLEncoded(body) })
  let res = await fetch(target + path, options)
  let json = await res.json()
  return json
}
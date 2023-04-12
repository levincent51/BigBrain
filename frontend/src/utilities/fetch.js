
const port = 5005

const fetchAPI = async (method, token, path, body = null) => {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (body) {
    const response = await fetch(`http://localhost:${port}/${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    })
    return await response.json()
  } else {
    const response = await fetch(`http://localhost:${port}/${path}`, {
      method,
      headers,
    })
    return await response.json()
  }
}

export default fetchAPI

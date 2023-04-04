
const port = 5005;

const fetchAPI = async (method, token, path, body = null) => {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    const response = await fetch(`http://localhost:${port}/${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data;
  } else {
    const response = await fetch(`http://localhost:${port}/${path}`, {
      method,
      headers,
    })
    const data = await response.json()
    return data;
  }
};

export default fetchAPI;

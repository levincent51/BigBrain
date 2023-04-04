
const port = 5005;

const fetchAPI = (method, token, path, body = null) => {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    return fetch(`http://localhost:${port}/${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.error) {
          throw new Error('Login failed');
        }
        return response.json();
      })
  } else {
    return fetch(`http://localhost:${port}/${path}`, {
      method,
      headers,
    })
      .then((response) => {
        if (response.error) {
          throw new Error('Login failed');
        }
        return response.json();
      })
  }
};

export default fetchAPI;

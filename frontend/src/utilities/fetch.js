
const port = 5005;

const fetchAPI = (method, token, path, body = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

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
};

export default fetchAPI;

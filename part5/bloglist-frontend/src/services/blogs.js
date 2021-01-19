import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

function setToken(newToken) {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, setToken, create, update, remove }

import * as axios from 'axios'

const BASE_URL = 'http://localhost:3001'

function upload (formData) {
  const url = `${BASE_URL}/separate`
  return axios.post(url, formData)
}

export { upload }

import axios from 'axios'

export async function PostData(type, userData) {
  let BaseURL = 'http://localhost:8080/api/auth/' + type
  return await axios.post(BaseURL, userData)
}

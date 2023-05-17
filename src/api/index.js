import axios from 'axios'

export async function PostData(type, userData) {
  let BaseURL = 'http://localhost:8080/api/auth/' + type
  return await axios.post(BaseURL, userData)
}

export async function GetLogout(type, logoutData) {
  let BaseURL = 'http://localhost:8080/api/auth/' + type
  return await axios.get(BaseURL, logoutData)
}


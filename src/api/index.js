import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:8088/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})

export async function PostData(endpoint, data, config) {
  return await api.post(endpoint, data, config)
}
export async function GetData(endpoint, config) {
  return await api.get(endpoint, config)
}
export async function PutData(endpoint, data, config) {
  return await api.put(endpoint, data, config)
}
export async function DeleteData(endpoint, config) {
  return await api.delete(endpoint, config)
}


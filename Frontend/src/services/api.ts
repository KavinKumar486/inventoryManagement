
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333', 
  withCredentials: false,
})
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('admin_jwt_token')
  const customerToken = localStorage.getItem('jwt_token')
  if (config.url.startsWith('/admin') && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`
  } else if (customerToken) {
    config.headers.Authorization = `Bearer ${customerToken}`
  }
  return config
})
export default api
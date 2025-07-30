
import { defineStore } from 'pinia'

export const useAdminAuthStore = defineStore('adminAuth', {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('admin_jwt_token', token)
    },

    setUser(user) {
      this.user = user
      localStorage.setItem('admin_user', JSON.stringify(user))
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('admin_jwt_token')
      localStorage.removeItem('admin_user')
    },
  },
})
// src/stores/useAuthStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: null,
      name: '',
      location: '',
    },
    token: null,
  }),

  actions: {
    setUser(userData) {
      this.user = {
        id: userData.id,
        name: userData.name,
        location: userData.location,
      }
    },
    setToken(token) {
      this.token = token
    },
    clearAuth() {
      this.user = { id: null, name: '', location: '' }
      this.token = null
    },
  },
})

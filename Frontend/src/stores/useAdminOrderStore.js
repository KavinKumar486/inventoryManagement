
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAdminOrderStore = defineStore('adminOrder', {
  state: () => ({
    orders: [],
    search: '',
    sortBy: '',
    loading: false,
    error: null,
  }),

  getters: {
    filteredItems(state) {
      let items = [...state.orders]
      if (state.search) {
        items = items.filter((item) =>
          item.customerLocation.toLowerCase().includes(state.search.toLowerCase())
        )
      }
      if (state.sortBy) {
        items.sort((a, b) => (a[state.sortBy] > b[state.sortBy] ? 1 : -1))
      }
      return items
    },
  },

  actions: {
    async fetchOrders() {
      this.loading = true
      try {
        const response = await api.get('/orders/get')
        this.orders = response.data.data
        this.error = null
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addOrder(order) {
      try {
        const response = await api.post('/orders/add', order)
        this.orders.push(response.data.data)
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    async updateOrder(id, order) {
      try {
        await api.put(`/orders/update/${id}`, order)
        const index = this.orders.findIndex((o) => o.id === id)
        if (index !== -1) {
          this.orders[index] = { ...order, id }
        }
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    async deleteOrder(id) {
      try {
        await api.delete(`/orders/delete/${id}`)
        this.orders = this.orders.filter((o) => o.id !== id)
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    setSearch(value) {
      this.search = value
    },

    setSort(column) {
      this.sortBy = column
    },
  },
})
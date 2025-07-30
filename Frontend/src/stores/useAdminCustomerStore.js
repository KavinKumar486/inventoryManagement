import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAdminCustomerStore = defineStore('adminCustomer', {
  state: () => ({
    customers: [],
    search: '',
    sortBy: '',
    loading: false,
    error: null,
  }),

  getters: {
    filteredItems(state) {
      let items = [...state.customers]
      if (state.search) {
        items = items.filter((item) =>
          item.name.toLowerCase().includes(state.search.toLowerCase())
        )
      }
      if (state.sortBy) {
        items.sort((a, b) => (a[state.sortBy] > b[state.sortBy] ? 1 : -1))
      }
      return items
    },
  },

  actions: {
    async fetchCustomers() {
      this.loading = true
      try {
        const response = await api.get('/customers/get')
        this.customers = response.data.data
        this.error = null
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addCustomer(customer) {
      try {
        const response = await api.post('/customers/add', customer)
        this.customers.push(response.data.data)
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    async updateCustomer(id, customer) {
      try {
        await api.put(`/customers/update/${id}`, customer)
        const index = this.customers.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.customers[index] = { ...customer, id }
        }
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    async deleteCustomer(id) {
      try {
        await api.delete(`/customers/delete/${id}`)
        this.customers = this.customers.filter((c) => c.id !== id)
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
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAdminWarehouseStore = defineStore('adminWarehouse', {
  state: () => ({
    items: [],
    search: '',
    sortBy: '',
    loading: false,
    error: null,
  }),

  getters: {
    filteredItems(state) {
      let items = [...state.items]
      if (state.search) {
        items = items.filter((item) =>
          item.productName.toLowerCase().includes(state.search.toLowerCase())
        )
      }
      if (state.sortBy) {
        items.sort((a, b) => (a[state.sortBy] > b[state.sortBy] ? 1 : -1))
      }
      return items
    },
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const response = await api.get('/warehouse/get')
        this.items = response.data.data
        this.error = null
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addItem(item) {
      try {
        const response = await api.post('/warehouse/add', item)
        this.items.push(response.data.data)
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    async updateItem(id, item) {
      try {
        await api.put(`/warehouse/update/${id}`, item)
        const index = this.items.findIndex((i) => i.id === id)
        if (index !== -1) {
          this.items[index] = { ...item, id }
        }
        this.error = null
      } catch (error) {
        this.error = error.message
      }
    },

    async deleteItem(id) {
      try {
        await api.delete(`/warehouse/delete/${id}`)
        this.items = this.items.filter((i) => i.id !== id)
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
import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL ||'http://localhost:3333'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouses: [],
    loading: false,
    error: null,
    searchText: '',
    sortKey: '',
    sortAsc: true,
  }),

  getters: {
    filteredItems(state) {
      let result = Array.isArray(state.warehouses) ? [...state.warehouses] : []

      if (state.searchText.trim()) {
        const text = state.searchText.trim().toLowerCase()
        result = result.filter((item) =>
          Object.values(item).some((val) => String(val).toLowerCase().includes(text)),
        )
      }

      if (state.sortKey) {
        result.sort((a, b) => {
          const valA = a[state.sortKey]
          const valB = b[state.sortKey]

          if (typeof valA === 'number' && typeof valB === 'number') {
            return state.sortAsc ? valA - valB : valB - valA
          }

          return state.sortAsc
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA))
        })
      }

      return result
    },
  },

  actions: {
    setSearch(text) {
      this.searchText = text
    },
    setSort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc
      } else {
        this.sortKey = key
        this.sortAsc = true
      }
    },
    async fetchWarehouses() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`${baseURL}/warehouse/get`)
        this.warehouses = Array.isArray(res.data.data) ? res.data.data : []
      } catch (err) {
        console.error('Fetch warehouse error:', err)
        this.error = 'Failed to fetch warehouse items'
      } finally {
        this.loading = false
      }
    },
    async addWarehouse(payload) {
      await axios.post(`${baseURL}/warehouse/add`, payload)
      this.fetchWarehouses()
    },
    async updateWarehouse(id, updatedData) {
      await axios.patch(`${baseURL}/warehouse/update/${id}`, updatedData)
      this.fetchWarehouses()
    },
    async deleteWarehouse(id) {
      await axios.delete(`${baseURL}/warehouse/delete/${id}`)
      this.fetchWarehouses()
    },
  },
})

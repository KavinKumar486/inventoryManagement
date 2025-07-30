<script setup>
import '@/assets/formStyle.css'
import { ref, watch, computed, onMounted } from 'vue'
import { useWarehouseStore } from '@/stores/useWarehouseStore'
import ListItem from '@/components/listItems.vue'

const store = useWarehouseStore()

const searchText = ref('')
const selectedLocation = ref('')

const columns = ['productName', 'price']
const allLocations = computed(() => {
  const set = new Set(store.warehouses.map(item => item.location))
  return Array.from(set)
})

const filteredByLocation = computed(() => {
  if (!selectedLocation.value) return store.filteredItems
  return store.filteredItems.filter(item => item.location === selectedLocation.value)
})

watch(searchText, (val) => {
  store.setSearch(val)
})

onMounted(() => {
  store.fetchWarehouses()
})
</script>

<template>
  <div>
    <h2>Products</h2>

    <div v-if="store.loading">Loading warehouse items...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <template v-else>
      <label>Select Location:</label>
      <select v-model="selectedLocation">
        <option value="" disabled>Select one</option>
        <option v-for="loc in allLocations" :key="loc" :value="loc">{{ loc }}</option>
      </select>
      <input v-model="searchText" @input="() => store.setSearch(searchText)" placeholder="Search..." />
      <ListItem
        :columns="columns"
        :items="filteredByLocation"
        :onDeleteItem="store.deleteWarehouse"
        :onSaveUpdate="(item) => store.updateWarehouse(item.id, item)"
        @sort="store.setSort"
      />
    </template>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
  margin-left: 10px;
}
</style>
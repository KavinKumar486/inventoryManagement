
<script setup>
import '@/assets/formStyle.css'
import { watch, ref, onMounted } from 'vue'
import { useAdminWarehouseStore } from '@/stores/useAdminWarehouseStore'
import ListItem from '@/components/adminListItem.vue'
import { useRouter } from 'vue-router'

const searchText = ref('')
const store = useAdminWarehouseStore()
const newItem = ref({ productName: '', price: 0, productQuantity: 0, location: '' })
const errors = ref({ productName: '', price: '', productQuantity: '', location: '' })
const columns = ['productName', 'price', 'productQuantity', 'location']
const router = useRouter()

watch(searchText, (val) => {
  store.setSearch(val)
})

onMounted(() => {
  store.fetchItems()
})

function validateStringField(value, fieldName, min = 2, max = 255) {
  if (!value) return `${fieldName} is required.`
  if (value.length < min) return `${fieldName} must be at least ${min} characters.`
  if (value.length > max) return `${fieldName} must be at most ${max} characters.`
  return ''
}

function validateNumberField(value, fieldName, min = 0) {
  if (value === '') return `${fieldName} is required.`
  if (isNaN(value) || value < min) return `${fieldName} must be a number greater than or equal to ${min}.`
  return ''
}

function addItem() {
  errors.value.productName = validateStringField(newItem.value.productName, 'Product Name')
  errors.value.price = validateNumberField(newItem.value.price, 'Price')
  errors.value.productQuantity = validateNumberField(newItem.value.productQuantity, 'Quantity')
  errors.value.location = validateStringField(newItem.value.location, 'Location')
  if (errors.value.productName || errors.value.price || errors.value.productQuantity || errors.value.location) return
  store.addItem({ ...newItem.value, orderQuantity: 0 })
  newItem.value = { productName: '', price: 0, productQuantity: 0, location: '' }
  errors.value = { productName: '', price: '', productQuantity: '', location: '' }
}

function startSearch() {
  store.setSearch(searchText.value)
}
</script>

<template>
  <nav class="navBar">
    <router-link to="/admin/customers">Customers</router-link> |
    <router-link to="/admin/warehouse">Warehouse</router-link> |
    <router-link to="/admin/orders">Orders</router-link> |
    <button @click="router.push('/admin/login')">Logout</button>
  </nav>
  <div>
    <h2>Warehouse Items</h2>
    <input v-model="searchText" @input="startSearch" placeholder="Search by product name..." />
    <form @submit.prevent="addItem" style="margin-bottom: 20px;">
      <input v-model="newItem.productName" placeholder="Product Name" />
      <span v-if="errors.productName" class="error">{{ errors.productName }}</span>
      <input v-model.number="newItem.price" type="number" placeholder="Price" />
      <span v-if="errors.price" class="error">{{ errors.price }}</span>
      <input v-model.number="newItem.productQuantity" type="number" placeholder="Quantity" />
      <span v-if="errors.productQuantity" class="error">{{ errors.productQuantity }}</span>
      <input v-model="newItem.location" placeholder="Location" />
      <span v-if="errors.location" class="error">{{ errors.location }}</span>
      <button type="submit">Add Item</button>
    </form>
    <div v-if="store.loading">Loading items...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <ListItem
      :columns="columns"
      :items="store.filteredItems"
      :onDeleteItem="store.deleteItem"
      :onSaveUpdate="(item) => store.updateItem(item.id, item)"
      @sort="store.setSort"
    />
  </div>
</template>

<style>
.error {
  color: red;
  font-size: 0.9em;
  margin-left: 10px;
}
.navBar {
  margin-bottom: 20px;
}
.navBar a, .navBar button {
  margin-right: 10px;
}
</style>
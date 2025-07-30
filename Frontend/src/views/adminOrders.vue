<script setup>
import '@/assets/formStyle.css'
import { watch, ref, onMounted } from 'vue'
import { useAdminOrderStore } from '@/stores/useAdminOrderStore'
import ListItem from '@/components/adminListItem.vue'
import { useRouter } from 'vue-router'

const searchText = ref('')
const store = useAdminOrderStore()
const newOrder = ref({ customerId: '', orderDate: '', deliveryDate: '', customerLocation: '' })
const errors = ref({ customerId: '', orderDate: '', deliveryDate: '', customerLocation: '' })
const columns = ['customerId', 'orderDate', 'deliveryDate', 'customerLocation']
const router = useRouter()

watch(searchText, (val) => {
  store.setSearch(val)
})

onMounted(() => {
  store.fetchOrders()
})

function validateNumberField(value, fieldName) {
  if (value === '') return `${fieldName} is required.`
  if (isNaN(value) || value <= 0) return `${fieldName} must be a positive number.`
  return ''
}

function validateDateField(value, fieldName) {
  if (!value) return `${fieldName} is required.`
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return `${fieldName} must be in YYYY/MM/DD format.`
  return ''
}

function validateStringField(value, fieldName, min = 2, max = 255) {
  if (!value) return `${fieldName} is required.`
  if (value.length < min) return `${fieldName} must be at least ${min} characters.`
  if (value.length > max) return `${fieldName} must be at most ${max} characters.`
  return ''
}

function addOrder() {
  errors.value.customerId = validateNumberField(newOrder.value.customerId, 'Customer ID')
  errors.value.orderDate = validateDateField(newOrder.value.orderDate, 'Order Date')
  errors.value.deliveryDate = validateDateField(newOrder.value.deliveryDate, 'Delivery Date')
  errors.value.customerLocation = validateStringField(newOrder.value.customerLocation, 'Location')
  if (errors.value.customerId || errors.value.orderDate || errors.value.deliveryDate || errors.value.customerLocation) return
  store.addOrder({ ...newOrder.value, items: [] }) // Minimal order for demo
  newOrder.value = { customerId: '', orderDate: '', deliveryDate: '', customerLocation: '' }
  errors.value = { customerId: '', orderDate: '', deliveryDate: '', customerLocation: '' }
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
    <h2>Orders</h2>
    <input v-model="searchText" @input="startSearch" placeholder="Search by location..." />
    <form @submit.prevent="addOrder" style="margin-bottom: 20px;">
      <input v-model.number="newOrder.customerId" type="number" placeholder="Customer ID" />
      <span v-if="errors.customerId" class="error">{{ errors.customerId }}</span>
      <input v-model="newOrder.orderDate" placeholder="Order Date (YYYY/MM/DD)" />
      <span v-if="errors.orderDate" class="error">{{ errors.orderDate }}</span>
      <input v-model="newOrder.deliveryDate" placeholder="Delivery Date (YYYY/MM/DD)" />
      <span v-if="errors.deliveryDate" class="error">{{ errors.deliveryDate }}</span>
      <input v-model="newOrder.customerLocation" placeholder="Location" />
      <span v-if="errors.customerLocation" class="error">{{ errors.customerLocation }}</span>
      <button type="submit">Add Order</button>
    </form>
    <div v-if="store.loading">Loading orders...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <ListItem
      :columns="columns"
      :items="store.filteredItems"
      :onDeleteItem="store.deleteOrder"
      :onSaveUpdate="(item) => store.updateOrder(item.id, item)"
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
<script setup>
import '@/assets/formStyle.css'
import { watch, ref, onMounted } from 'vue'
import { useAdminCustomerStore } from '@/stores/useAdminCustomerStore'
import ListItem from '@/components/adminListItem.vue'
import { useRouter } from 'vue-router'

const searchText = ref('')
const store = useAdminCustomerStore()
const newCustomer = ref({ name: '', email: '', location: '' })
const errors = ref({ name: '', email: '', location: '' })
const columns = ['name', 'email', 'location']
const router = useRouter()

watch(searchText, (val) => {
  store.setSearch(val)
})

onMounted(() => {
  store.fetchCustomers()
})

function validateStringField(value, fieldName, min = 2, max = 255) {
  if (!value) return `${fieldName} is required.`
  if (value.length < min) return `${fieldName} must be at least ${min} characters.`
  if (value.length > max) return `${fieldName} must be at most ${max} characters.`
  return ''
}

function validateEmail(value) {
  if (!value) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format.'
  return ''
}

function addCustomer() {
  errors.value.name = validateStringField(newCustomer.value.name, 'Name')
  errors.value.email = validateEmail(newCustomer.value.email)
  errors.value.location = validateStringField(newCustomer.value.location, 'Location')
  if (errors.value.name || errors.value.email || errors.value.location) return
  store.addCustomer({ ...newCustomer.value, password: 'default123' }) // Default password
  newCustomer.value = { name: '', email: '', location: '' }
  errors.value = { name: '', email: '', location: '' }
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
    <h2>Customers</h2>
    <input v-model="searchText" @input="startSearch" placeholder="Search by name..." />
    <form @submit.prevent="addCustomer" style="margin-bottom: 20px;">
      <input v-model="newCustomer.name" placeholder="Name" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
      <input v-model="newCustomer.email" placeholder="Email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
      <input v-model="newCustomer.location" placeholder="Location" />
      <span v-if="errors.location" class="error">{{ errors.location }}</span>
      <button type="submit">Add Customer</button>
    </form>
    <div v-if="store.loading">Loading customers...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <ListItem
      :columns="columns"
      :items="store.filteredItems"
      :onDeleteItem="store.deleteCustomer"
      :onSaveUpdate="(item) => store.updateCustomer(item.id, item)"
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useAdminAuthStore } from '@/stores/useAdminAuthStore'

const router = useRouter()
const authStore = useAdminAuthStore()
const credentials = ref({ username: '', password: '' })
const error = ref('')

async function login() {
  try {
    const response = await api.post('/admin/login', credentials.value)
    if (response.data.message === 'success') {
      authStore.setToken(response.data.token)
      authStore.setUser(response.data.user)
      router.push('/admin/customers')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  }
}
</script>

<template>
  <div>
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <input v-model="credentials.username" placeholder="Username" required />
      <input v-model="credentials.password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style>
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}
</style>
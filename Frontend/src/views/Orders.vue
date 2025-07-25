<template>
  <div>
    <h1>Your Orders</h1>

    <div v-if="orders.length === 0">
      <p>No orders found.</p>
    </div>

    <div v-else>
      <div
        v-for="order in orders"
        :key="order.id"
      >
        <h2>Order #{{ order.id }}</h2>
        <p><strong>Date:</strong> {{ order.orderDate }}</p>
        <p><strong>Delivery:</strong> {{ order.deliveryDate }}</p>
        <p><strong>Location:</strong> {{ order.customerLocation }}</p>

        <table border="1">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in order.items"
              :key="item.id"
            >
              <td>{{ item.product?.productName || 'N/A' }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.product?.price || 0 }}</td>
              <td>{{ item.quantity * (item.product?.price || 0) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/stores/useAuthStore' 
const authStore = useAuthStore()
const orders = ref([])
onMounted(async () => {
  try {
    const response = await api.get('/orders/get', {
      params: { customerId: authStore.user.id }  
    })
    orders.value = response.data.data
  } catch (error) {
    console.error('Failed to load orders:', error)
  }
})
</script>

<style scoped>
th, td {
  padding: 6px;
}
</style>

<template>
  <div class="orders-page">
    <h2>Order Summary</h2>

    <div v-if="checkoutItems.length === 0">
      <p>No items to checkout.</p>
      <router-link to="/landingPage">Go Back</router-link>
    </div>

    <div v-else>
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in checkoutItems" :key="item.id">
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity * item.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>{{ totalAmount }}</strong></td>
          </tr>
        </tfoot>
      </table>

      <button @click="placeOrder">Place Order</button>
    </div>
  </div>
</template>

// views/CheckoutPage.vue
<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const checkoutItems = computed(() => cartStore.checkoutItems)

const totalAmount = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

async function placeOrder() {
  try {
    if (!authStore.user.id) {
      alert('Please log in to place an order')
      router.push('/login')
      return
    }

    if (!checkoutItems.value || !Array.isArray(checkoutItems.value) || !checkoutItems.value.length) {
      alert('No items to order')
      return
    }

    const payload = {
      customerId: authStore.user.id,
      orderDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      deliveryDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      customerLocation: authStore.user.location || 'Unknown',
      items: checkoutItems.value.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }

    await api.post('/orders/add', payload)
    alert('Order Placed Successfully!')
    cartStore.clearCheckoutItems()
    router.push('/orders')
  } catch (err) {
    console.error('Order failed:', err)
    alert('Order Failed. Please try again.')
  }
}
</script>

<style scoped>
.orders-page {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
}
tfoot td {
  font-weight: bold;
}
</style>
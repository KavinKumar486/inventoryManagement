<template>
  <div class="orders-page">
    <h2>Order Summary</h2>

    <div v-if="checkoutItems.length === 0">
      <p>No items to checkout.</p>
      <router-link to="/">Go Back</router-link>
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

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/useAuthStore' // assuming you have this
import { useRouter } from 'vue-router'
import api from '@/services/api' // your axios wrapper

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

// Fallback: use buyNowItems if present, else cartItems
const checkoutItems = computed(() =>
  cartStore.buyNowItems.length ? cartStore.buyNowItems : cartStore.cartItems
)

const totalAmount = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

async function placeOrder() {
  try {
    if (!checkoutItems.value.length) {
      alert('No items to order')
      return
    }

    const payload = {
      customerId: authStore.user.id,
      orderDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      deliveryDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      customerLocation: authStore.user.location,
      items: checkoutItems.value.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }

    await api.post('/orders/add', payload)

    alert('Order Placed Successfully!')
    cartStore.clearCart()
    cartStore.clearBuyNow()
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
<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

function checkoutFromCartAndNavigate() {
  cartStore.checkoutFromCart()
  router.push('/checkout')
}
</script>

<template>
  <div>
    <h2>Your Cart</h2>
    <ul v-if="cartStore.cartItems.length">
      <li v-for="item in cartStore.cartItems" :key="item.id">
        {{ item.productName }} - ₹{{ item.price }} x {{ item.quantity }}
        (Available: {{ item.productQuantity }})
        <button @click="cartStore.reduceQuantity(item.id)">-</button>
        <button @click="cartStore.removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <p v-else>No items in cart</p>

    <p>Total: ₹{{ cartStore.totalPrice }}</p>
    <button @click="checkoutFromCartAndNavigate">Checkout</button>
  </div>
</template>

<style scoped>
button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:first-of-type {
  background-color: #ff4444;
  color: white;
}
button:first-of-type:hover {
  background-color: #cc0000;
}
button:last-of-type {
  background-color: #f0f0f0;
}
button:last-of-type:hover {
  background-color: #e0e0e0;
}
</style>
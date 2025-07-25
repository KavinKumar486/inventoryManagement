<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const checkout = () => {
  router.push({
  name: 'checkout',
  state: {
    items: cartStore.cartItems, 
  },
})
}
function checkoutFromCartAndNavigate() {
  cartStore.checkoutFromCart()
  router.push('/orders')
}
</script>

<template>
  <div>
    <h2>Your Cart</h2>
    <ul v-if="cartStore.cartItems.length">
      <li v-for="item in cartStore.cartItems" :key="item.id">
        {{ item.productName }} - ₹{{ item.price }} x {{ item.quantity }}
        <button @click="cartStore.removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <p v-else>No items in cart</p>

    <p>Total: ₹{{ cartStore.totalPrice }}</p>
    <button @click="checkoutFromCartAndNavigate">Checkout</button>

  </div>
</template>

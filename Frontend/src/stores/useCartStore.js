import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    buyNowItems: [],
    checkoutItems: [],
  }),

  getters: {
    totalItems(state) {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    },
    totalPrice(state) {
      return state.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    },
  },

  actions: {
    addToCart(item) {
      const existing = this.cartItems.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        this.cartItems.push(item)
      }
    },

    setBuyNowItems(items) {
      this.buyNowItems = items
      this.checkoutItems = items
    },

    checkoutFromCart() {
      this.checkoutItems = [...this.cartItems]
    },

    clearCart() {
      this.cartItems = []
    },

    clearCheckoutItems() {
      this.checkoutItems = []
      this.buyNowItems = []
    },
  },
})

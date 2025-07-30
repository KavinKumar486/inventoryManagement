// src/stores/useCartStore.js
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
        if(existing.quantity>existing.productQuantity){
          existing.quantity = existing.productQuantity
          alert(`Maximum quantity of the selected Product is ${existing.quantity}`)
        }
      } else {
        this.cartItems.push({...item,quantity:Math.min(item.quantity,item.productQuantity)})
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
      this.cartItems = []
    },

    clearBuyNow() {
      this.buyNowItems = []
    },

    reduceQuantity(itemId){
      const item = this.cartItems.find((i)=> i.id ===itemId)
      if(item){
        item.quantity-=1
        if(item.quantity<0){
          this.removeFromCart(itemId)
        }
        
      
      else if(item.quantity <item.productQuantity){
        item.quantity = item.productQuantity
        alert( `Not available the maximum available quantity is ${item.productQuantity}`)
      }
    }
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
    },
  },
})

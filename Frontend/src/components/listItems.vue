<template>
  <router-link class="navButton" to="/cart"> Cart ({{ cartStore.totalItems }}) </router-link>
  <router-link  class="navButton" to="/orders">Orders</router-link>
  <button class="navButton" @click="goBack">Go Back</button>
  <table border="1">
    <thead>
      <tr>
        <th
          v-for="(col, index) in columns"
          :key="index"
          @click="$emit('sort', col)"
        >
          {{ col }}
        </th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in localItems" :key="item.id">
        <td v-for="col in columns" :key="col">
          <template v-if="item.isEditing">
            <input v-model="item[col]" />
          </template>
          <template v-else>
            {{ item[col] }}
          </template>
        </td>

        <td>
          <button @click="buyNow(item)">Buy Now</button>

          <template v-if="!item.showQuantityDropdown">
            <button @click="item.showQuantityDropdown = true">Add to Cart</button>
          </template>
          <template v-else>
            <select v-model.number="item.selectedQuantity">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
            <button @click="confirmAddToCart(item)">Confirm</button>
            <button @click="item.showQuantityDropdown = false">Cancel</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps(['columns', 'items'])

const router = useRouter()
const cartStore = useCartStore()

const localItems = ref([])
defineEmits(['deleteItem', 'saveUpdate', 'sort'])
watch(
  () => props.items,    
  (newItems) => {
    localItems.value = newItems.map((item) => ({
      ...item,
      isEditing: false,
      showQuantityDropdown: false,
      selectedQuantity: 1,
    }))
  },
  { immediate: true, deep: true },
)
function buyNow(item) {
  cartStore.setBuyNowItems([{ ...item, quantity: 1 }])
  router.push({ name: 'checkout' })
}
function confirmAddToCart(item) {
  cartStore.addToCart({
    ...item,
    quantity: item.selectedQuantity,
  })
  item.showQuantityDropdown = false
}
function goBack(){
  router.go(-1)
}
</script>
<style scoped>
.navButton{
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}
</style>
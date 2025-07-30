<template>
    <table border="1">
      <thead>
        <tr>
          <th
            v-for="(col, index) in columns"
            :key="index"
            @click="$emit('sort', col)"
            style="cursor: pointer"
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
            <template v-if="item.isEditing">
              <button @click="saveItem(item)">Save</button>
              <button @click="cancelEdit(item)">Cancel</button>
            </template>
            <template v-else>
              <button @click="editItem(item)">Edit</button>
              <button @click="onDeleteItem(item.id)">Delete</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { onUpdated, ref, watch } from 'vue'
  
  const props = defineProps(['columns', 'items', 'onSaveUpdate', 'onDeleteItem'])
  const localItems = ref([])
  
  onUpdated(() => {
    console.log('List Item updated')
  })
  
  watch(
    () => props.items,
    (newItems) => {
      localItems.value = newItems.map((item) => ({ ...item, isEditing: false }))
    },
    { immediate: true, deep: true }
  )
  
  function editItem(item) {
    item.isEditing = true
  }
  
  function cancelEdit(item) {
    item.isEditing = false
  }
  
  function saveItem(item) {
    item.isEditing = false
    props.onSaveUpdate(item)
  }
  </script>
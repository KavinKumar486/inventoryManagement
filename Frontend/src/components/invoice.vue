<template>
  <div class="p-4">
    <div ref="pdfContent" class="bg-white p-4 shadow rounded">
      
      
    </div>

    <button
      @click="downloadPDF"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Download Invoice
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const pdfContent = ref(null)

function downloadPDF() {
    const element = document.getElementById('ordersView')
  const options = {
    margin:       0.5,
    filename:     'invoice.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  }

  html2pdf().set(options).from(element).save()
}
</script>

<style scoped>

</style>

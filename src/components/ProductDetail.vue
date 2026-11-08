<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow space-y-4">
    <button @click="emit('back')" class="text-blue-600 hover:underline">
      &larr; Back to products
    </button>

    <div>
      <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
        {{ product.category }}
      </span>
      <h2 class="text-2xl font-bold mt-2">{{ product.name }}</h2>
      <p class="text-xl text-blue-600 font-semibold mt-1">${{ product.price.toFixed(2) }}</p>
    </div>

    <div>
      <h3 class="font-medium mb-1">Description</h3>
      <p class="text-gray-700">{{ product.description }}</p>
    </div>
  </div>
</template>

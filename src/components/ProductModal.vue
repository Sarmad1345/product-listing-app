<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Product } from '../types/product'

const props = defineProps<{
  open: boolean
  mode: 'create' | 'edit'
  product: Product | null
}>()

const emit = defineEmits<{
  save: [data: Omit<Product, 'id'>]
  close: []
}>()

// Form fields
const name = ref('')
const price = ref('')
const category = ref('')
const description = ref('')

const errors = ref({ name: '', price: '', category: '', description: '' })

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return

    errors.value = { name: '', price: '', category: '', description: '' }

    if (props.mode === 'edit' && props.product) {
      name.value = props.product.name
      price.value = String(props.product.price)
      category.value = props.product.category
      description.value = props.product.description
    } else {
      name.value = ''
      price.value = ''
      category.value = ''
      description.value = ''
    }
  },
)

function validate() {
  errors.value = { name: '', price: '', category: '', description: '' }

  if (name.value.trim() === '') {
    errors.value.name = 'Name is required'
  }

  if (price.value === '') {
    errors.value.price = 'Price is required'
  } else if (Number(price.value) <= 0) {
    errors.value.price = 'Price must be greater than 0'
  }

  if (category.value.trim() === '') {
    errors.value.category = 'Category is required'
  }

  if (description.value.trim() === '') {
    errors.value.description = 'Description is required'
  }

  return (
    errors.value.name === '' &&
    errors.value.price === '' &&
    errors.value.category === '' &&
    errors.value.description === ''
  )
}

function handleSubmit() {
  if (!validate()) return 

  emit('save', {
    name: name.value.trim(),
    price: Number(price.value),
    category: category.value.trim(),
    description: description.value.trim(),
  })
}
</script>

<template>

  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
    >
      <h2 class="text-xl font-semibold">
        {{ mode === 'edit' ? 'Edit Product' : 'Add Product' }}
      </h2>

     
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <input v-model="name" type="text" class="w-full border rounded px-3 py-2" />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
      </div>

  
      <div>
        <label class="block text-sm font-medium mb-1">Price</label>
        <input v-model="price" type="number" step="0.01" class="w-full border rounded px-3 py-2" />
        <p v-if="errors.price" class="text-red-600 text-sm mt-1">{{ errors.price }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Category</label>
        <input v-model="category" type="text" class="w-full border rounded px-3 py-2" />
        <p v-if="errors.category" class="text-red-600 text-sm mt-1">{{ errors.category }}</p>
      </div>


      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea v-model="description" rows="3" class="w-full border rounded px-3 py-2"></textarea>
        <p v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</p>
      </div>

      <div class="flex gap-2 justify-end">
        <button type="button" @click="emit('close')" class="border px-4 py-2 rounded hover:bg-gray-100">
          Cancel
        </button>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ mode === 'edit' ? 'Update' : 'Save' }}
        </button>
      </div>
    </form>
  </div>
</template>

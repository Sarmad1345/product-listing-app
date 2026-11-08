import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Product } from '../types/product'

const STORAGE_KEY = 'products'

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Mouse',
    price: 25.99,
    category: 'Electronics',
    description: 'A comfortable wireless mouse with long battery life.',
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    price: 12.5,
    category: 'Clothing',
    description: 'Soft 100% cotton t-shirt, available in many colors.',
  },
  {
    id: 3,
    name: 'Coffee Mug',
    price: 8,
    category: 'Kitchen',
    description: 'Ceramic mug that holds 350ml of your favorite drink.',
  },
]

function loadProducts(): Product[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : defaultProducts
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>(loadProducts())

  watch(
    products,
    (newProducts) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
    },
    { deep: true },
  )

  function addProduct(data: Omit<Product, 'id'>) {
    products.value.push({ id: Date.now(), ...data })
  }

  function updateProduct(id: number, data: Omit<Product, 'id'>) {
    const index = products.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      products.value[index] = { id, ...data }
    }
  }

  function deleteProduct(id: number) {
    products.value = products.value.filter((p) => p.id !== id)
  }

  return { products, addProduct, updateProduct, deleteProduct }
})

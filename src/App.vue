<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import ProductModal from './components/ProductModal.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import ProductDetail from './components/ProductDetail.vue'
import { useProductStore } from './stores/productStore'
import type { Product } from './types/product'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const currentPage = ref<'list' | 'detail'>('list')

const selectedProduct = ref<Product | null>(null)

const isModalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const productToEdit = ref<Product | null>(null)

function openCreateModal() {
  modalMode.value = 'create'
  productToEdit.value = null
  isModalOpen.value = true
}

function openEditModal(product: Product) {
  modalMode.value = 'edit'
  productToEdit.value = product
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function saveProduct(data: Omit<Product, 'id'>) {
  if (modalMode.value === 'edit' && productToEdit.value) {
    productStore.updateProduct(productToEdit.value.id, data)
  } else {
    productStore.addProduct(data)
  }
  closeModal()
}

const productToDelete = ref<Product | null>(null)

function askDelete(product: Product) {
  productToDelete.value = product
}

function confirmDelete() {
  if (productToDelete.value) {
    productStore.deleteProduct(productToDelete.value.id)
  }
  productToDelete.value = null
}

function cancelDelete() {
  productToDelete.value = null
}

function viewProduct(product: Product) {
  selectedProduct.value = product
  currentPage.value = 'detail'
}

function goToList() {
  selectedProduct.value = null
  currentPage.value = 'list'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-xl mx-auto">
      <!-- Detail page -->
      <ProductDetail
        v-if="currentPage === 'detail' && selectedProduct"
        :product="selectedProduct"
        @back="goToList"
      />

      <div v-else class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-semibold">Products ({{ products.length }})</h2>
          <button
            @click="openCreateModal"
            class="bg-green-600 text-white text-sm px-3 py-2 rounded hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>

        <p v-if="products.length === 0" class="text-gray-500">No products yet.</p>

        <ul v-else class="space-y-2">
          <li
            v-for="product in products"
            :key="product.id"
            class="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p class="font-medium">{{ product.name }} - ${{ product.price.toFixed(2) }}</p>
              <p class="text-sm text-gray-500">{{ product.category }}</p>
            </div>
            <div class="flex gap-2">
              <button
                @click="viewProduct(product)"
                class="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                View
              </button>
              <button
                @click="openEditModal(product)"
                class="bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                @click="askDelete(product)"
                class="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <ProductModal
      :open="isModalOpen"
      :mode="modalMode"
      :product="productToEdit"
      @save="saveProduct"
      @close="closeModal"
    />

    <ConfirmModal
      :open="productToDelete !== null"
      :message="`Are you sure you want to delete '${productToDelete?.name}'?`"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

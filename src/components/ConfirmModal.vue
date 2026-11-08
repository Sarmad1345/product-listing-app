<script setup lang="ts">
defineProps<{
  open: boolean
  message: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-white p-6 rounded-lg shadow w-full max-w-sm space-y-4">
      <p>{{ message }}</p>

      <div class="flex gap-2 justify-end">
        <button @click="emit('cancel')" class="border px-4 py-2 rounded hover:bg-gray-100">
          Cancel
        </button>
        <button @click="emit('confirm')" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

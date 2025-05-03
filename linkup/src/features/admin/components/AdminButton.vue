<script setup>
import '@/assets/css/admin-styles.css'

defineProps({
  type: {
    type: String,
    default: 'default', // 'primary', 'secondary', 'approve', 'reject'
  }
})
</script>

<template>
  <button :class="['btn', `btn-${type}`]">
    <slot />
  </button>
</template>

<style scoped>

</style>

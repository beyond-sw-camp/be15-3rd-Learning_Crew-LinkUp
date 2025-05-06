<script setup>
import '@/assets/css/admin-styles.css'

const props = defineProps({
  type: {
    type: String,
    default: 'default' // 'primary', 'secondary', 'approve', 'reject'
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button
    :type="'button'"
    :class="['btn', `btn-${props.type}`]"
    :aria-label="ariaLabel || undefined"
  >
    <slot />
  </button>
</template>

<style scoped>
/* 역할별 스타일은 admin-styles.css에서 관리 */
</style>

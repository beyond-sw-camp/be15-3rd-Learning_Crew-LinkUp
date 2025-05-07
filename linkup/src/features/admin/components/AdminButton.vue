<script setup>
import '@/assets/css/admin-styles.css'

// 명시적인 타입 제한과 aria-label 처리
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: val => ['default', 'primary', 'secondary', 'approve', 'reject'].includes(val)
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})

// aria-label이 빈 문자열일 경우 속성 제외
const computedAriaLabel = props.ariaLabel || undefined
</script>

<template>
  <button
    type="button"
    :class="['btn', `btn-${props.type}`]"
    :aria-label="computedAriaLabel"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>

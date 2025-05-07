<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: val => ['default', 'primary', 'secondary', 'approve', 'reject'].includes(val)
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  nativeType: {
    type: String,
    default: 'button' // ← 기본값은 그대로 유지
  }
})
</script>

<template>
  <button
    :type="props.nativeType"
  :class="['btn', `btn-${props.type}`]"
  :aria-label="props.ariaLabel || undefined"
  >
  <slot />
  </button>
</template>

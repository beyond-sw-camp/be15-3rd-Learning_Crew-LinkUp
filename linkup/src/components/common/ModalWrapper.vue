<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="modal-overlay"
    role="dialog"
    aria-modal="true"
    @click.self="emit('close')"
  >
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

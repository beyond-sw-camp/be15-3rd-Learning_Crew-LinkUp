<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue"
import '@/assets/css/admin-styles.css'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div
      v-if="modelValue"
      class="modal user-authority-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      @click.self="$emit('update:modelValue', false)"
  >
    <section class="modal-content user-authority-modal-content">
      <header>
        <slot name="title">
          <h2 class="modal-title" id="modalTitle">상세 보기</h2>
        </slot>
      </header>

      <section class="modal-body" aria-label="모달 본문">
        <slot />
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          <AdminButton type="secondary" @click="$emit('update:modelValue', false)">닫기</AdminButton>
        </slot>
      </footer>
    </section>
  </div>
</template>

<style scoped>
/* 스타일은 admin-styles.css에 포함됨 */
</style>

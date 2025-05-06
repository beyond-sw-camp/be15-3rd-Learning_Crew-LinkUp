<!-- src/features/admin/components/AdminModal.vue -->
<script setup>
import AdminButton from '@/features/admin/components/AdminButton.vue'
import '@/assets/css/admin-styles.css'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    v-if="modelValue"
    class="modal user-authority-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
    @click.self="close"
  >
    <section class="modal-content user-authority-modal-content">
      <!-- 헤더 영역 -->
      <header>
        <slot name="title">
          <h2 class="modal-title" id="modalTitle">상세 보기</h2>
        </slot>
      </header>

      <!-- 본문 영역 -->
      <section class="modal-body" aria-label="모달 본문">
        <slot />
      </section>

      <!-- 푸터 영역 -->
      <footer class="modal-footer">
        <slot name="footer">
          <AdminButton type="secondary" @click="close">닫기</AdminButton>
        </slot>
      </footer>
    </section>
  </div>
</template>

<style scoped>
/* 실제 스타일은 admin-styles.css에 포함됨 */
</style>

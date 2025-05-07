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

// 닫기 동작 실행
const close = () => emit('update:modelValue', false)
</script>

<template>
  <!-- 모달 외부 클릭 시 닫기 -->
  <div
    v-if="modelValue"
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
    @click.self="close"
  >
    <section class="modal-content" aria-describedby="modalContent">
      <!-- 모달 헤더 -->
      <header class="modal-header">
        <slot name="title">
          <h2 class="modal-title" id="modalTitle">상세 보기</h2>
        </slot>
      </header>

      <!-- 모달 본문 -->
      <section id="modalContent" class="modal-body" aria-label="상세 정보">
        <slot />
      </section>

      <!-- 모달 푸터 -->
      <footer class="modal-footer">
        <slot name="footer">
          <AdminButton type="secondary" @click="close">닫기</AdminButton>
        </slot>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.modal-header {
  margin-bottom: 16px;
}
</style>

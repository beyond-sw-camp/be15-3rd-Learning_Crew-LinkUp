<script setup>
import AdminButton from '@/features/admin/components/AdminButton.vue'
import '@/assets/css/admin-styles.css'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '상세 보기'
  },
  description: {
    type: String,
    default: ''
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
    class="modal detail-viewer"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
    @click.self="close"
  >
    <section class="modal-content" role="document">
      <!-- 헤더 영역 -->
      <header>
        <slot name="title">
          <div>
            <h2 class="modal-title" id="modalTitle">{{ title }}</h2>
            <p v-if="description" class="sub-text">{{ description }}</p>
          </div>
        </slot>
      </header>

      <!-- 본문 영역 -->
      <section class="modal-section" aria-label="상세 내용 영역">
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
/* 스타일은 admin-styles.css에 정의됨 */
</style>

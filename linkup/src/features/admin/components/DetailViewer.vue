<template>
  <div
      v-if="modelValue"
      class="modal detail-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      @click.self="$emit('update:modelValue', false)"
  >
    <section class="modal-content">
      <!-- 헤더 -->
      <header>
        <h2 class="modal-title" id="modalTitle">{{ title }}</h2>
        <p v-if="description" class="sub-text">{{ description }}</p>
      </header>

      <!-- 본문 -->
      <section class="modal-body" aria-label="모달 본문">
        <slot />
      </section>

      <!-- 푸터 -->
      <footer class="modal-footer">
        <slot name="footer">
          <AdminButton type="secondary" @click="$emit('update:modelValue', false)">닫기</AdminButton>
        </slot>
      </footer>
    </section>
  </div>
</template>

<script setup>
import AdminButton from '@/features/admin/components/AdminButton.vue'
import '@/assets/css/admin-styles.css'

// props
const props = defineProps({
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

// emits
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
/* 공통 DetailViewer 스타일은 admin-styles.css에 정의되어 있음 */
</style>

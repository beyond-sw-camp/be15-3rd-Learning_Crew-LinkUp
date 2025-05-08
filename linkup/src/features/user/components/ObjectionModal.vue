<script setup>
import { ref, computed } from 'vue'
import '@/assets/css/report-styles.css'

const props = defineProps({
  modelValue: Boolean,
  type: String, // 'post' | 'comment' | 'review'
  targetInfo: Object // { content: '내용', nickname: '홍길동' }
})
const emit = defineEmits(['update:modelValue', 'submit'])

const reason = ref('')

const title = computed(() => {
  const map = { post: '게시글', comment: '댓글', review: '장소 후기' }
  return `이의 제기 (${map[props.type] || ''})`
})

const contentLabel = computed(() => {
  return props.type === 'post' ? '게시글 제목'
    : props.type === 'comment' ? '댓글 내용'
      : '후기 내용'
})

const handleSubmit = () => {
  if (!reason.value.trim()) {
    alert('이의 제기 사유를 입력해주세요.')
    return
  }
  emit('submit', { reason: reason.value })
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="modal" @click.self="$emit('update:modelValue', false)">
    <div class="report-modal">
      <h2 class="modal-title">{{ title }}</h2>

      <!-- 대상 정보 -->
      <div class="modal-report-section">
        <div class="info-grid-user">
          <div class="section-title">제재 대상 정보</div>
          <div class="info-item-user">
            <div class="label">{{ contentLabel }}</div>
            <div class="value">{{ targetInfo.content }}</div>
          </div>
        </div>
      </div>

      <!-- 이의 제기자 정보 -->
      <div class="modal-report-section">
        <div class="info-grid-user">
          <div class="section-title">사용자 정보</div>
          <div class="info-item-user">
            <div class="label">닉네임</div>
            <div class="value">{{ targetInfo.nickname }}</div>
          </div>
        </div>
      </div>

      <!-- 이의 제기 사유 -->
      <div class="modal-report-section">
        <div class="section-title">이의 제기 사유</div>
        <div class="info-grid-input">
          <div class="info-item">
            <div class="value">
              <textarea
                v-model="reason"
                rows="4"
                placeholder="이의 제기 내용을 작성해 주세요."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="modal-buttons">
        <button class="btn btn-approve" @click="handleSubmit">제출</button>
        <button class="btn btn-secondary" @click="$emit('update:modelValue', false)">취소</button>
      </div>
    </div>
  </div>
</template>

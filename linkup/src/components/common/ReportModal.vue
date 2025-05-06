<script setup>
import { computed, ref, onMounted } from 'vue'
import { fetchReportTypes } from '@/api/admin.js'
import '@/assets/css/report-styles.css'

const props = defineProps({
  modelValue: Boolean,
  type: String, // 'user' | 'post' | 'comment'
  targetInfo: Object // { content: string, nickname: string }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const reason = ref('')
const reportTypeId = ref(null)
const reportTypes = ref([]) // 신고 유형 목록

// 신고 유형 API 호출
onMounted(async () => {
  try {
    const res = await fetchReportTypes()
    reportTypes.value = res.data
    if (reportTypes.value.length > 0) {
      reportTypeId.value = reportTypes.value[0].id
    }
  } catch (e) {
    console.error('🚨 신고 유형 로딩 실패:', e)
    reportTypes.value = []
  }
})

const title = computed(() => {
  return props.type === 'user'
    ? '사용자 신고'
    : props.type === 'post'
      ? '게시글 신고'
      : '댓글 신고'
})

const contentLabel = computed(() => {
  return props.type === 'user' ? '닉네임'
    : props.type === 'post' ? '게시글 내용'
      : '댓글 내용'
})

const handleSubmit = () => {
  if (!reportTypeId.value || !reason.value.trim()) {
    alert('신고 유형과 신고 사유를 모두 입력해주세요.')
    return
  }

  emit('submit', {
    type: props.type,
    reportTypeId: reportTypeId.value,
    reason: reason.value
  })
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="modal" @click.self="$emit('update:modelValue', false)">
    <div class="report-modal">
      <h2 class="modal-report-title">{{ title }}</h2>

      <!-- 대상 정보 -->
      <div class="modal-report-section">
        <div class="info-grid-user">
          <div class="section-title">
            {{ props.type === 'user' ? '사용자 정보' : props.type === 'post' ? '게시글 정보' : '댓글 정보' }}
          </div>
          <div class="info-item-user">
            <div class="label">{{ contentLabel }}</div>
            <div class="value">{{ targetInfo.content }}</div>
          </div>
        </div>
      </div>

      <!-- 신고자 정보 -->
      <div class="modal-report-section">
        <div class="info-grid-user">
          <div class="section-title">신고자 정보</div>
          <div class="info-item info-item-user">
            <div class="label">신고자 닉네임</div>
            <div class="value">{{ targetInfo.nickname }}</div>
          </div>
        </div>
      </div>

      <!-- 신고 유형 -->
      <div class="modal-report-section">
        <div class="section-title">신고 내용</div>
        <div class="info-grid-input">
          <div class="info-item">
            <div class="label">신고 유형</div>
            <div class="value">
              <select v-model.number="reportTypeId" class="modal-select">
                <option v-for="type in reportTypes" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 신고 사유 -->
      <div class="modal-report-section">
        <div class="section-title">신고 사유</div>
        <div class="info-grid-input">
          <div class="info-item">
            <div class="value">
              <textarea
                v-model="reason"
                rows="4"
                placeholder="신고 내용을 작성해 주세요."
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

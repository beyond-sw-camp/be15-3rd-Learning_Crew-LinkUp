<script setup>
import { ref } from 'vue'
import ReportModal from '@/components/common/ReportModal.vue'
// import '@/assets/css/admin-styles.css'


const isModalOpen = ref(false)
const modalType = ref('')
const targetInfo = ref('')

const openModal = (type) => {
  modalType.value = type

  // 더미 target 정보
  if (type === 'user') targetInfo.value = '악성유저123'
  else if (type === 'post') targetInfo.value = '이 게시글 내용은 너무 도배가 심해요.'
  else if (type === 'comment') targetInfo.value = '비속어가 포함된 댓글입니다.'

  isModalOpen.value = true
}

const handleSubmit = (payload) => {
  console.log('🚨 신고 제출됨:', payload)
  alert(`신고가 정상적으로 접수되었습니다.\n\n- 대상: ${targetInfo.value}\n- 유형: ${payload.reportType}\n- 사유: ${payload.reason}`)
  isModalOpen.value = false
}
</script>

<template>
  <div class="report-view">
    <h1>신고 예시 화면</h1>
    <div class="report-button-group">
      <button class="report-btn" @click="openModal('user')">👤 사용자 신고</button>
      <button class="report-btn" @click="openModal('post')">📝 게시글 신고</button>
      <button class="report-btn" @click="openModal('comment')">💬 댓글 신고</button>
    </div>

    <ReportModal
      v-if="isModalOpen"
      v-model="isModalOpen"
      :type="modalType"
      :target-info="targetInfo"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>

</style>

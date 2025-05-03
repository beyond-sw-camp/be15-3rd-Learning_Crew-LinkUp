<script setup>
import DetailViewer from './DetailViewer.vue'
import { format } from 'date-fns'
import '@/assets/css/admin-styles.css'

const props = defineProps({
  modelValue: Boolean,
  report: Object
})
const emit = defineEmits(['update:modelValue'])

const formatDate = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd HH:mm')

const handleFalseReport = () => {
  alert('허위 신고 처리')
}

const handlePenalty = () => {
  alert('제재 처리 완료')
}
</script>


<template>
  <DetailViewer v-model="modelValue" title="신고 상세 정보" description="신고 대상과 사유를 확인하고 후속 조치를 진행할 수 있습니다.">
    <div class="modal-section">
      <div class="section-title">신고자 / 피신고자</div>
      <div class="info-grid">
        <div class="info-item">
          <div class="label">신고자</div>
          <div class="value">{{ report.reporterMemberId }} / {{ report.reporterName }}</div>
        </div>
        <div class="info-item">
          <div class="label">피신고자</div>
          <div class="value">{{ report.targetMemberId }} / {{ report.targetName }}</div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <div class="section-title">신고 정보</div>
      <div class="info-grid">
        <div class="info-item">
          <div class="label">신고 유형</div>
          <div class="value">{{ report.reportType }}</div>
        </div>
        <div class="info-item">
          <div class="label">상태</div>
          <div class="value">{{ report.status }}</div>
        </div>
        <div class="info-item">
          <div class="label">신고 일시</div>
          <div class="value">{{ formatDate(report.createdAt) }}</div>
        </div>
        <div class="info-item" v-if="report.commentId">
          <div class="label">댓글 ID</div>
          <div class="value">{{ report.commentId }}</div>
        </div>
        <div class="info-item" v-if="report.postId">
          <div class="label">게시글 ID</div>
          <div class="value">{{ report.postId }}</div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <div class="section-title">신고 사유</div>
      <div class="reason-box">
        {{ report.reason }}
      </div>
    </div>

    <div class="modal-buttons">
      <button class="btn btn-reject" @click="handleFalseReport">허위 신고</button>
      <button class="btn btn-approve" @click="handlePenalty">제재 처리</button>
    </div>
  </DetailViewer>
</template>


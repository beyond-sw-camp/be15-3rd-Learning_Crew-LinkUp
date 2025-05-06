<script setup>
import { ref } from 'vue'
import ObjectionModal from '@/features/user/components/ObjectionModal.vue'
import '@/assets/css/report-styles.css'
import {
  objectToPlaceReview,
  objectToPost,
  objectToComment
} from '@/api/admin.js' // 실제 등록 API

const isModalOpen = ref(false)
const modalType = ref('') // 'review' | 'post' | 'comment'
const targetInfo = ref('')

// 테스트 데이터
const memberId = 51
const postId = 24
const commentId = 30
const reviewId = 23

// 모달 열기
const openModal = (type) => {
  modalType.value = type
  if (type === 'review') targetInfo.value = '해당 장소 후기 내용이 부당합니다.'
  else if (type === 'post') targetInfo.value = '게시글 제재는 오해에서 비롯된 것입니다.'
  else if (type === 'comment') targetInfo.value = '댓글 제재는 과도합니다.'

  isModalOpen.value = true
}

// 이의 제기 제출
const handleSubmit = async (payload) => {
  const reason = payload.reason
  try {
    let res

    if (modalType.value === 'review') {
      res = await objectToPlaceReview(reviewId, { memberId, reason })
    } else if (modalType.value === 'post') {
      res = await objectToPost(postId, { memberId, reason })
    } else if (modalType.value === 'comment') {
      res = await objectToComment(commentId, { memberId, reason })
    }

    alert(`✅ 이의 제기가 등록되었습니다.\n\n📌 대상: ${targetInfo.value}\n📄 사유: ${reason}\n\n💬 응답: ${res.data.message || '완료'}`)
  } catch (e) {
    console.error('🚨 이의 제기 실패:', e)
    alert('이의 제기 중 오류가 발생했습니다.')
  } finally {
    isModalOpen.value = false
  }
}
</script>

<template>
  <div class="objection-view">
    <h1>이의 제기 예시 화면</h1>
    <div class="objection-button-group">
      <button class="objection-btn" @click="openModal('review')">📝 장소 후기 제재 이의</button>
      <button class="objection-btn" @click="openModal('post')">📄 게시글 제재 이의</button>
      <button class="objection-btn" @click="openModal('comment')">💬 댓글 제재 이의</button>
    </div>

    <ObjectionModal
      v-if="isModalOpen"
      v-model="isModalOpen"
      :type="modalType"
      :target-info="targetInfo"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.objection-button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
}
.objection-btn {
  padding: 12px 24px;
  background-color: #7d6fb3;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.objection-btn:hover {
  background-color: #6c5da8;
}
</style>

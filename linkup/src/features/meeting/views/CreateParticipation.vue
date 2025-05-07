<!--<script setup>-->
<!--import PointCheckLayout from '@/features/meeting/components/PointCheckLayout.vue';-->
<!--import { computed, ref } from 'vue';-->
<!--import { useRoute } from 'vue-router';-->
<!--import { useAuthStore } from '@/stores/auth.js';-->
<!--import api from '@/api/axios.js';-->
<!--const route = useRoute();-->

<!--const meetingId = route.params.meetingId;-->

<!--const auth = useAuthStore();-->

<!--const handleCreateParticipation = async () => {-->
<!--  try {-->
<!--    const response = await api.post(`/common-service/meetings/${meetingId}/participation`,-->
<!--     { memberId: auth.userId }-->
<!--    );-->
<!--    if (response.data.success) {-->
<!--      console.log('참가 신청 성공');-->
<!--    } else {-->
<!--      console.log('참가 신청 실패');-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error('모임 신청 중 오류 발생:', error);-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--<PointCheckLayout>-->
<!--  <template #participant-points>-->
<!--    <div class="form-title">참가 신청</div>-->
<!--    <h1>모임 참가를 신청하시겠습니까?</h1>-->
<!--  </template>-->
<!--  <template #next-btn>-->
<!--    <button class="next-btn" @click="handleCreateParticipation">예</button>-->
<!--&lt;!&ndash; 모달 띄워서 참가 신청 승인하면 상세 페이지로 리다이렉트 &ndash;&gt;-->
<!--    <button class="next-btn reject">아니오</button>-->
<!--  </template>-->
<!--</PointCheckLayout>-->
<!--</template>-->

<!--<style scoped>-->
<!--h1 {-->
<!--  margin: 0;-->
<!--  font-size: 26px;-->
<!--}-->

<!--.form-title {-->
<!--  font-size: 1.75rem;-->
<!--  font-weight: 700;-->
<!--  margin-bottom: 32px;-->
<!--}-->

<!--.point {-->
<!--  margin-top: 4px;-->
<!--  font-size: 0.9rem;-->
<!--  color: #5790ff;-->
<!--  font-weight: 500;-->
<!--}-->

<!--.participant-points .form-group {-->
<!--  margin-bottom: 24px;-->
<!--}-->

<!--.group-label {-->
<!--  display: block;-->
<!--  font-size: 0.9rem;-->
<!--  font-weight: 600;-->
<!--  margin-bottom: 8px;-->
<!--  color: #6b7280;-->
<!--}-->

<!--.button {-->
<!--  width: 100%;-->
<!--  margin-top: 30px;-->
<!--  padding: 15px;-->
<!--  background: #007bff;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  font-size: 16px;-->
<!--  border-radius: 8px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.next-btn {-->
<!--  margin-top: 12px;-->
<!--  width: 100%;-->
<!--  background-color: #5790ff;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  padding: 14px;-->
<!--  border-radius: 8px;-->
<!--  font-size: 1.1rem;-->
<!--  font-weight: 600;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.next-btn:hover {-->
<!--  background-color: #365ec9;-->
<!--}-->
<!--</style>-->
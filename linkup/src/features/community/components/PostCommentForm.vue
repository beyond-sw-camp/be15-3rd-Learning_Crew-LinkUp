<template>
  <div class="comment-form">
    <textarea v-model="newComment" placeholder="댓글을 입력해주세요..." />
    <button @click="submitComment">댓글 등록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/features/community/communityApi';

const props = defineProps({
  postId: Number,
  onCommentAdded: Function, // 부모 컴포넌트에서 새 댓글 등록 후 처리
});

const newComment = ref('');

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    await api.createComment(props.postId, newComment.value);
    newComment.value = '';
    props.onCommentAdded(); // 댓글 새로고침 요청
  } catch (e) {
    console.error('댓글 등록 실패', e);
  }
};
</script>

<style scoped>
.comment-form {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

textarea {
  resize: vertical;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 8px;
}

button {
  align-self: flex-end;
  padding: 8px 16px;
  background-color: #5678f0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<!--
<template>
  <div class="comment-form">
    <textarea v-model="newComment" placeholder="댓글을 입력해주세요..." />
    <button @click="submitComment">댓글 등록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/features/community/communityApi';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  postId: Number,
  onCommentAdded: Function, // 댓글 등록 후 실행할 콜백
});

const newComment = ref('');
const auth = useAuthStore();

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  console.log('userId from auth:', auth.userId);         // ref냐 값이냐 확인
  console.log('isAuthenticated:', auth.isAuthenticated); // 로그인 상태 확인
  console.log('accessToken:', auth.accessToken);         // 토큰 살아있나 확인

  try {
    const userId = auth.userId;
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    await api.createComment(props.postId, newComment.value, auth.userId);
    newComment.value = '';
    props.onCommentAdded(); // 댓글 등록 후 목록 갱신
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
-->
<template>
  <div class="comment-form">
    <textarea
        v-model="newComment"
        placeholder="댓글을 입력해주세요..."
    />
    <button @click="submitComment">💬 댓글 등록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/features/community/communityApi';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  postId: Number,
  onCommentAdded: Function, // 댓글 등록 후 콜백
});

const newComment = ref('');
const auth = useAuthStore();

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    const userId = auth.userId;
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    await api.createComment(props.postId, newComment.value, userId);
    newComment.value = '';
    props.onCommentAdded();
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
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafbfd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

textarea {
  resize: vertical;
  padding: 12px 14px;
  font-size: 15px;
  line-height: 1.5;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  min-height: 80px;
  transition: border-color 0.3s ease;
}

textarea:focus {
  outline: none;
  border-color: #5678f0;
  box-shadow: 0 0 0 2px rgba(86, 120, 240, 0.2);
}

button {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #5678f0;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3f5bd8;
}
</style>

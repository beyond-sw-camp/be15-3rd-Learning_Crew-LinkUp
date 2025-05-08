<template>
  <div class="community-detail">
    <!-- 목록 + 액션버튼 묶어서 한 줄에 배치 -->
    <div class="button-row">
      <!-- 목록으로 돌아가기 -->
      <button class="back-button" @click="goBack">
        ← 목록으로
      </button>

      <!-- 수정/삭제/신고 버튼 -->
      <div class="action-buttons">
        <button @click="editPost">수정</button>
        <button @click="deletePost">삭제</button>
        <button @click="reportPost">신고</button>
      </div>
    </div>

    <!-- 제목 -->
    <h1 class="post-title">{{ post?.title }}</h1>

    <!-- 작성자 정보 -->
    <div class="author-info">
      <img :src="post?.profileImageUrl || defaultImage"
           alt="프로필"
           class="author-img"
           @click="openMiniProfile($event, post?.userId)" />
      <div>
        <div class="nickname" @click="openMiniProfile($event, post?.userId)">
          {{ post?.nickname }}
        </div>
        <div class="date">작성일: {{ formatDate(post?.createdAt) }}</div>
      </div>
    </div>

    <!-- 게시글 이미지 -->
    <div class="post-images" v-if="post?.imageUrls?.length">
      <img
          v-for="(url, index) in post.imageUrls"
          :key="index"
          :src="url"
          class="post-image"
          alt="게시글 이미지"
      />
    </div>

    <!-- 게시글 본문 -->
    <div class="post-box">
      <p class="content">{{ post?.content }}</p>
      <div class="post-footer">
        <div></div>
        <div class="like-section">❤️ {{ post?.likeCount || 0 }}</div>
      </div>
    </div>



    <PostCommentForm
        :postId="post?.postId"
        :onCommentAdded="fetchPost"
    />

    <!-- 댓글 리스트 -->
    <div class="comments" v-if="post?.comments?.length">
      <h2>댓글</h2>
      <div class="comment" v-for="comment in post.comments" :key="comment.commentId">
        <div class="comment-header">
          <img :src="comment.profileImageUrl || defaultImage"
               class="comment-img"
               alt="comment_img"
               @click="openMiniProfile($event, comment.userId)" />
          <div class="comment-meta">
            <div class="comment-user">
          <span class="comment-nickname" @click="openMiniProfile($event, comment.userId)">
            {{ comment.nickname }}
          </span>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
              <span class="comment-like">❤️ {{ comment.likeCount || 0 }}</span>
            </div>
            <p class="comment-content">{{ comment.commentContent }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 미니 프로필 컴포넌트 삽입 예정 위치 -->
    <UserMiniProfile
        v-if="showProfile"
        :user="selectedUser"
        :position="profilePosition"
        @close="closeMiniProfile"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/features/community/communityApi';
import {getUserProfile} from "@/api/user.js";
import UserMiniProfile from "@/features/community/components/UserMiniProfile.vue";
import PostCommentForm from "@/features/community/components/PostCommentForm.vue";


const route = useRoute();
const router = useRouter();
const postId = computed(() => route.params.id);
const post = ref(null);
const newComment = ref('');

const showProfile = ref(false);
const selectedUser = ref(null);
const profilePosition = ref({ x: 0, y: 0 });
const defaultImage = 'https://api.dicebear.com/7.x/thumbs/svg?seed=%EA%B1%B4%ED%9D%AC';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const fetchPost = async () => {
  try {
    const res = await api.fetchPostById(postId.value);
    console.log('[DEBUG] 게시글 데이터:', res.data.data);
    post.value = res.data.data;
  } catch (e) {
    console.error('상세 조회 실패', e);
  }
};

const openMiniProfile = async (event, targetId) => {
  try {
    const res = await getUserProfile({ targetId });
    console.log('[DEBUG] 프로필 응답:', res.data.data);
    console.log('user.id', res.data.data.member.user.userId)
    selectedUser.value = res.data.data.member;

    const targetEl = event.currentTarget || event.target;
    if (!targetEl || !targetEl.getBoundingClientRect) return;

    const rect = targetEl.getBoundingClientRect();
    profilePosition.value = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY + 8,
    };

    showProfile.value = true;
  } catch (e) {
    console.error('프로필 조회 실패', e);
  }
};

const goBack = () => {
  router.back() // 브라우저 히스토리 상 한 단계 뒤로 이동
}



const closeMiniProfile = () => {
  showProfile.value = false;
};

onMounted(fetchPost);
</script>

<style scoped>
.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.community-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}
.back-button {
  background: none;
  border: none;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
  text-decoration: underline;
}
.post-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.author-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.nickname {
  font-weight: bold;
}
.date {
  font-size: 0.9rem;
  color: #888;
}
.action-buttons {
  display: flex;
  gap: 10px;
}
.action-buttons button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #f0f0f0;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease;
}
.action-buttons button:hover {
  background-color: #d0d0ff;
}
.post-images {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.post-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
}
.post-box {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.content {
  font-size: 1.1rem;
  margin-bottom: 20px;
}
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like-section {
  font-size: 1.2rem;
}
.comment {
  margin-bottom: 20px;
}
.comment-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.comment-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
.comment-meta {
  flex: 1;
}
.comment-user {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.comment-nickname {
  font-weight: bold;
}
.comment-date {
  color: #888;
}
.comment-like {
  color: #e25555;
}
.comment-content {
  margin-left: 2px;
  font-size: 1rem;
  white-space: pre-wrap;
}

/* 추가 */
.comment-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.comment-nickname {
  font-weight: bold;
  margin-left: 8px;
}
.comment-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.comment-content {
  margin-bottom: 4px;
  font-size: 1rem;
}


</style>

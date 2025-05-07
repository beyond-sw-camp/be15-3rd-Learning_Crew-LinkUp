<!--<template>
  <div class="community-detail">
    &lt;!&ndash; 목록 + 액션버튼 묶어서 한 줄에 배치 &ndash;&gt;
    <div class="button-row">
      <button class="back-button" @click="goBack">← 목록으로</button>
      <div class="action-buttons">
        <button @click="editPost">수정</button>
        <button @click="deletePost">삭제</button>
        <button @click="reportPost">신고</button>
      </div>
    </div>

    <h1 class="post-title">{{ post?.title }}</h1>

    <div class="author-info">
      <img src="https://cdn.pixabay.com/photo/2022/02/13/17/22/cartoon-easter-bunny-7011655_1280.jpg" alt="프로필" class="author-img" />
      <div>
        <div class="nickname">{{ post?.nickname }}</div>
        <div class="date">작성일: {{ formatDate(post?.createdAt) }}</div>
      </div>
    </div>

    <div class="post-images" v-if="post?.imageUrls?.length">
      <img v-for="(url, index) in post.imageUrls" :key="index" :src="url" class="post-image" alt="게시글 이미지" />
    </div>

    <div class="post-box">
      <p class="content">{{ post?.content }}</p>
      <div class="post-footer">
        <div></div>
        <div class="like-section">❤️ {{ post?.likeCount || 0 }}</div>
      </div>
    </div>

    &lt;!&ndash; 댓글 등록 폼 &ndash;&gt;
    <PostCommentForm
        :postId="post?.postId"
        :onCommentAdded="fetchPost"
    />

    &lt;!&ndash; 댓글 리스트 &ndash;&gt;
    <PostCommentList :comments="post?.comments" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/features/community/communityApi';
import PostCommentForm from "@/features/community/components/PostCommentForm.vue";
import PostCommentList from "@/features/community/components/PostCommentList.vue";


const route = useRoute();
const router = useRouter();
const postId = computed(() => route.params.id);
const post = ref(null);

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const fetchPost = async () => {
  try {
    const res = await api.fetchPostById(postId.value);
    post.value = res.data.data;
  } catch (e) {
    console.error('상세 조회 실패', e);
  }
};

const goBack = () => router.push('/community');
const editPost = () => alert('수정 기능 준비 중');
const deletePost = () => alert('삭제 기능 준비 중');
const reportPost = () => alert('신고 기능 준비 중');

onMounted(() => {
  fetchPost();
});
</script>-->

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

    <!-- 댓글 등록창 -->
    <div class="comment-form">
      <textarea v-model="newComment" placeholder="댓글을 입력해주세요..."></textarea>
      <button @click="submitComment">댓글 등록</button>
    </div>

    <!-- 댓글 리스트 -->
    <div class="comments" v-if="post?.comments?.length">
      <h2>댓글</h2>
      <div class="comment" v-for="comment in post.comments" :key="comment.commentId">
        <p class="comment-content">{{ comment.commentContent }}</p>
        <div class="comment-footer">
          <img :src="comment.profileImageUrl || defaultImage"
               class="comment-img"
               @click="openMiniProfile($event, comment.userId)" />
          <span class="comment-nickname" @click="openMiniProfile($event, comment.userId)">
            {{ comment.nickname }}
          </span>
          <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
          <span class="comment-like">❤️ {{ comment.likeCount || 0 }}</span>
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


const route = useRoute();
const router = useRouter();
const postId = computed(() => route.params.id);
const post = ref(null);
const newComment = ref('');

const showProfile = ref(false);
const selectedUser = ref(null);
const profilePosition = ref({ x: 0, y: 0 });
const defaultImage = '/default-profile.png';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const fetchPost = async () => {
  try {
    const res = await api.fetchPostById(postId.value);
    post.value = res.data.data;
  } catch (e) {
    console.error('상세 조회 실패', e);
  }
};

const openMiniProfile = async (event, targetId) => {
  try {
    const res = await getUserProfile({ targetId });
    selectedUser.value = res.data.data;
    profilePosition.value = { x: event.clientX, y: event.clientY };
    showProfile.value = true;
  } catch (e) {
    console.error('프로필 조회 실패', e);
  }
};

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
</style>

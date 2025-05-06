<template>
  <a class="post-card" @click.prevent="goToDetail(post.postId)">
    <!-- 공지사항이 아닐 때만 썸네일 표시 -->
    <img
        v-if="post.isNotice !== 'Y'"
        :src="post.thumbnail || defaultThumbnail"
        class="thumbnail"
        alt="썸네일"
        loading="lazy"
    />
    <div class="post-content">
      <!-- 공지사항이면 별도 스타일 적용 -->
      <div class="post-title" :class="{ 'notice-title': post.isNotice === 'Y' }">
        {{ post.title }}
      </div>
      <!-- 공지사항이 아닐 때만 내용 표시 -->
      <div class="post-text" v-if="post.isNotice !== 'Y'">{{ post.content }}</div>
      <div class="post-footer">
        <span>{{ formatDate(post.createdAt) }}</span>
        <!-- 공지사항이 아닐 때만 좋아요/댓글 수 표시 -->
        <div v-if="post.isNotice !== 'Y'" class="likes-comments">
          ❤️ {{ post.likeCount || 0 }} 💬 {{ post.commentCount || 0 }}
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  post: Object
});

const router = useRouter();
const defaultThumbnail =
    'https://cdn.pixabay.com/photo/2022/02/13/17/22/cartoon-easter-bunny-7011655_1280.jpg';

const goToDetail = (id) => {
  router.push(`/community/${id}`);
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toISOString().split('T')[0];
};
</script>

<style scoped>
.post-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  margin-bottom: 16px;
  text-decoration: none;
  color: inherit;
}

.thumbnail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.post-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
}

.notice-title {
  font-size: 18px;
  font-weight: bold;
  color: #2851e3;
  display: flex;
  align-items: center;
}

.notice-title::before {
  content: "📢 ";
  margin-right: 4px;
}

.post-text {
  font-size: 15px;
  margin-bottom: 10px;
  color: #555;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
  margin-top: 10px;
}

.likes-comments {
  white-space: nowrap;
}
</style>

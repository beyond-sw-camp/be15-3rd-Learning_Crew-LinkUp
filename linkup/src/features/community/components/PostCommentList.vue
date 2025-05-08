<template>
  <div class="comment-list">
    <h3 class="title">댓글</h3>
    <div v-if="comments.length === 0" class="no-comment">아직 댓글이 없습니다.</div>
    <div v-else>
      <div
          v-for="comment in comments"
          :key="comment.commentId"
          class="comment-item"
      >
        <div class="comment-top">
          <img
              :src="comment.profileImageUrl || defaultImage"
              class="profile-img"
              alt="profile"
              @click="emitProfile(comment.userId, $event)"
          />
          <div class="comment-meta">
            <div class="nickname" @click="emitProfile(comment.userId, $event)">
              {{ comment.nickname }}
            </div>
            <div class="date">{{ formatDate(comment.createdAt) }}</div>
          </div>
        </div>

        <div class="comment-body">
          {{ comment.commentContent }}
        </div>

        <div class="comment-footer">
          ❤️ {{ comment.likeCount || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

defineProps({
  comments: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['openProfile']);

const defaultImage = 'https://api.dicebear.com/7.x/thumbs/svg?seed=guest';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

const emitProfile = (userId, event) => {
  emit('openProfile', { userId, event });
};
</script>

<style scoped>
.comment-list {
  margin-top: 40px;
}

.title {
  font-size: 18px;
  margin-bottom: 16px;
}

.comment-item {
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.comment-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.comment-meta {
  display: flex;
  flex-direction: column;
}

.nickname {
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.nickname:hover {
  text-decoration: underline;
  color: #5678f0;
}

.date {
  font-size: 13px;
  color: #999;
}

.comment-body {
  font-size: 15px;
  margin-bottom: 8px;
  color: #333;
}

.comment-footer {
  font-size: 14px;
  color: #888;
  text-align: right;
}

.no-comment {
  font-style: italic;
  color: #aaa;
  padding: 12px;
}
</style>

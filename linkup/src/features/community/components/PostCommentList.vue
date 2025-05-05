<template>
  <div class="comment-list">
    <h3>댓글</h3>
    <div v-if="comments.length === 0" class="no-comment">아직 댓글이 없습니다.</div>
    <div v-else>
      <div v-for="comment in comments" :key="comment.commentId" class="comment-item">
        <div class="comment-header">
          <span class="nickname">{{ comment.nickname }}</span>
          <span class="date">{{ formatDate(comment.createdAt) }}</span>
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
defineProps({
  comments: {
    type: Array,
    default: () => []
  }
});

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
</script>

<style scoped>
.comment-list {
  margin-top: 32px;
}

.comment-item {
  border-top: 1px solid #ddd;
  padding: 16px 0;
}

.comment-header {
  font-size: 14px;
  color: #555;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.comment-body {
  font-size: 16px;
  margin-bottom: 8px;
}

.comment-footer {
  font-size: 14px;
  color: #888;
}

.no-comment {
  color: #aaa;
  font-style: italic;
}
</style>

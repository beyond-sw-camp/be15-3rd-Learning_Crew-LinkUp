<template>
  <div class="post-detail-content">
    <h1 class="title">{{ post.title }}</h1>
    <div class="meta">
      <span class="nickname">{{ post.nickname }}</span>
      <span class="date">{{ formatDate(post.createdAt) }}</span>
    </div>

    <div v-if="post.imageUrls && post.imageUrls.length" class="image-list">
      <img v-for="(url, index) in post.imageUrls" :key="index" :src="url" class="post-image" />
    </div>

    <div class="content">{{ post.content }}</div>

    <div class="likes">
      ❤️ {{ post.likeCount || 0 }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object,
});

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
</script>

<style scoped>
.post-detail-content {
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.meta {
  color: gray;
  font-size: 14px;
  margin-bottom: 12px;
}

.image-list {
  margin: 16px 0;
}

.post-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 12px;
  border-radius: 8px;
}

.content {
  font-size: 16px;
  line-height: 1.6;
}

.likes {
  margin-top: 16px;
  font-size: 18px;
}
</style>

<!-- PointCheckLayout.vue -->
<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup>
// 더미 데이터 없음
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  padding: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>

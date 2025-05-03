<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import '@/assets/css/init-styles.css'

const route = useRoute()

// /admin 경로 여부 확인
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <!-- 일반 사용자 헤더만 출력 -->
  <header v-if="!isAdminRoute">
    <div class="main-header">
      <div class="logo">
        <img src="@/assets/icons/logo.svg" alt="로고" />
      </div>
      <nav class="nav-menu">
        <a href="#">커뮤니티</a>
        <a href="#">모임</a>
        <a href="#">장소</a>
        <a href="#">사용자</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>

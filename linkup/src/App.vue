<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 현재 경로
const route = useRoute()

// /admin으로 시작하면 관리자 페이지임
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <!-- 일반 사용자 헤더만 조건부 출력 -->
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

  <!-- 공통 라우터 뷰 (AdminLayout 포함됨) -->
  <router-view />
</template>

<style>
  .main-header {
    height: 60px;
    background: linear-gradient(to right, #e7f0ff, #f0e7ff);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .main-header .logo img {
    height: 36px;
  }

  .nav-menu a {
    margin-left: 20px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .nav-menu a:hover {
    color: #5b71f2;
  }

</style>
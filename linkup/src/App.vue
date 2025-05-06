<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';

// 현재 경로
const route = useRoute();

// /admin 경로 기반 필터링
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
  <!-- 일반 사용자 헤더만 조건부 출력 -->
  <Header v-if="!isAdminRoute" />
  <!-- 공통 라우터 뷰 (AdminLayout 포함됨) -->
  <RouterView />
  <Footer />
</template>

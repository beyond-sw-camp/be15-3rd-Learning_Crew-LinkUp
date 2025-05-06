<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Header from '@/components/layout/Header.vue';

// 현재 경로
const route = useRoute();

// /admin 경로 기반 필터링
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
  <Header v-if="!isAdminRoute" />

  <!-- 전체 라우터 에러 감지 -->
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <div class="fallback-ui">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1008/1008928.png"
          alt="경고 아이콘"
          class="fallback-icon"
        />
        <p class="fallback-text">화면을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    </template>
  </Suspense>
</template>

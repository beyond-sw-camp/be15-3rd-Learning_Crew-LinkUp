<script setup>
import { getBusinessMypage } from '@/api/user.js';
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { RouterLink, useRouter } from 'vue-router';

const userInfo = ref(null);
const isLoading = ref(true);
const isError = ref(false);

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    isLoading.value = true;
    isError.value = false;
    const { data } = await getBusinessMypage();
    userInfo.value = data.data;
  } catch (e) {
    console.error('사업자 마이페이지 조회 실패', e);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const logout = async () => {
  try {
    await authStore.logout();
    await router.push('/login');
  } catch (e) {
    console.error(e);
  }
};

const navigationItems = computed(() => [
  {
    name: 'settlement-by-month',
    label: '월별 정산 대금 조회',
    path: '/mypage/business/settlement-by-month',
  },
  {
    name: 'settlement-history',
    label: '정산 내역 조회',
    path: '/mypage/business/settlement-history',
  },
  { name: 'places', label: '운영 중인 장소 목록', path: '/mypage/business/places' },
  { name: 'password', label: '비밀번호 변경', path: '/mypage/business/password' },
]);
</script>

<template>
  <aside class="sidebar-container">
    <div v-if="isLoading">로딩 중...</div>
    <div v-else-if="isError">오류가 발생했습니다.</div>
    <template v-else>
      <!-- 프로필 섹션 -->
      <section class="profile-section">
        <img :src="userInfo.profileImageUrl" alt="프로필 이미지" class="profile-img" />
        <h2 class="profile-name">{{ userInfo.userName }}</h2>
      </section>

      <!-- 메뉴 -->
      <nav class="sidebar-nav">
        <ul>
          <li v-for="item in navigationItems" :key="item.name">
            <RouterLink class="nav-link" :to="item.path">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
      <!-- 로그아웃 버튼 -->
      <button class="logout-btn" @click="logout">로그아웃</button>
    </template>
  </aside>
</template>

<style scoped>
.sidebar-container {
  @apply flex flex-col justify-between bg-background-surface border-r border-border-subtle p-6 w-full h-full overflow-y-auto;
}

/* 프로필 영역 */
.profile-section {
  @apply flex flex-col items-center text-center;
}

.profile-img {
  @apply w-20 h-20 rounded-full mb-3;
}

.profile-name {
  @apply font-bold text-heading3 text-text-default mb-2;
}

/* 네비게이션 */
.sidebar-nav {
  @apply flex-1 flex flex-col justify-center overflow-y-auto mt-8 mb-8;
}

.sidebar-nav ul {
  @apply list-none p-0 space-y-4;
}

.nav-link {
  @apply text-text-default font-bodyMd hover:text-primary-default transition-colors;
}

/* 로그아웃 버튼 */
.logout-btn {
  @apply w-full py-3 bg-warning-default hover:bg-warning-background text-white font-bold rounded-md transition-colors mt-8 flex-shrink-0; /* 항상 하단 */
}
</style>

<script setup>
import { getUserMypage } from '@/api/user.js';
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
    const { data } = await getUserMypage();
    userInfo.value = data.data;
    authStore.setPointBalance(data.data.point);
  } catch (e) {
    console.error('회원 마이페이지 조회 실패', e);
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
  { name: 'profile', label: '프로필 조회', path: '/mypage/profile' },
  { name: 'joined-meetings', label: '참가 모임 이력', path: '/mypage/joined-meetings' },
  { name: 'created-meetings', label: '개설 모임 이력', path: '/mypage/created-meetings' },
  { name: 'points', label: '포인트 내역', path: '/mypage/points' },
  { name: 'posts', label: '작성한 게시글', path: '/mypage/posts' },
  { name: 'comments', label: '작성한 댓글', path: '/mypage/comments' },
  { name: 'friends', label: '친구 목록', path: '/mypage/friends' },
  { name: 'friend-meetings', label: '친구 개설 모임', path: '/mypage/friend-meetings' },
  { name: 'password', label: '비밀번호 변경', path: '/mypage/password' },
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
        <button type="button" class="edit-profile-btn">프로필 수정</button>

        <!-- 상태 카드 -->
        <div class="status-boxes">
          <div class="status-card manner">
            <div class="label">매너 온도</div>
            <div class="value">
              <span class="icon">😎</span>
              <span class="number">{{ userInfo.mannerTemperature }}°</span>
            </div>
          </div>
          <div class="status-card point">
            <div class="label">나의 포인트</div>
            <div class="value">{{ userInfo.point.toLocaleString() }}P</div>
            <button type="button" class="charge-btn">충전하기</button>
          </div>
        </div>
      </section>

      <!-- 메뉴 -->
      <nav class="sidebar-nav">
        <ul>
          <li v-for="item in navigationItems" :key="item.name" class="nav-link">
            <RouterLink :to="item.path">{{ item.label }}</RouterLink>
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

.edit-profile-btn {
  @apply bg-primary-default hover:bg-primary-hover text-white text-bodySm font-bodySm px-4 py-2 rounded-sm;
}

/* 상태 카드 영역 */
.status-boxes {
  @apply flex flex-col gap-4 mt-6 w-full;
}

.status-card {
  @apply p-4 rounded-md shadow-sm flex flex-col items-center gap-2;
}

.status-card.manner {
  @apply bg-background-muted;
}

.status-card.point {
  @apply bg-warning-background;
}

.label {
  @apply text-bodySm text-text-subtle;
}

.value {
  @apply text-heading3 font-bold text-text-default flex items-center gap-2;
}

.icon {
  @apply text-2xl;
}

.charge-btn {
  @apply mt-2 px-6 py-2 bg-highlight-yellow text-text-default font-bold rounded-sm w-48 hover:bg-yellow-400 transition-colors;
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

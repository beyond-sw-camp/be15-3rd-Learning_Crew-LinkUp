<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const logout = async () => {
  await authStore.clearAuth();
  await router.push('/login');
};

const roleLabel = {
  USER: '회원',
  BUSINESS: '사업자',
  ADMIN: '관리자',
};

const roleIcon = {
  USER: new URL('@/assets/icons/profile/user.svg', import.meta.url).href,
  BUSINESS: new URL('@/assets/icons/profile/user.svg', import.meta.url).href,
  ADMIN: new URL('@/assets/icons/profile/admin.svg', import.meta.url).href,
};
</script>

<template>
  <nav class="nav" aria-label="메인 네비게이션">
    <ul class="nav-list">
      <li><RouterLink class="nav-link" to="/community">커뮤니티</RouterLink></li>
      <li><RouterLink class="nav-link" to="/community">모임</RouterLink></li>
      <li><RouterLink class="nav-link" to="/create">장소</RouterLink></li>

      <template v-if="authStore.isAuthenticated">
        <li class="relative" ref="dropdownRef">
          <button class="profile-button" @click.stop="toggleDropdown" aria-label="프로필 메뉴 열기">
            <img
              class="profile-image"
              :src="
                authStore.profileImage || 'https://api.dicebear.com/9.x/thumbs/svg?seed=profile'
              "
              alt="프로필 이미지"
            />
            <span class="profile-name">{{ authStore.nickname || '사용자' }}</span>
          </button>

          <transition name="fade-slide">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <!-- 역할 표시 -->
              <div class="dropdown-role">
                <img :src="roleIcon[authStore.userRole]" alt="Role Icon" class="role-icon" />
                <span class="role-text">{{ roleLabel[authStore.userRole] }}</span>
              </div>

              <!-- 메뉴 목록 -->
              <RouterLink class="dropdown-item" to="/mypage">
                <img src="@/assets/icons/profile/mypage.svg" alt="Mypage Icon" class="menu-icon" />
                마이페이지
              </RouterLink>
              <div class="divider" />

              <template v-if="authStore.userRole === 'USER'">
                <RouterLink class="dropdown-item" to="/notifications">
                  <img src="@/assets/icons/profile/alert.svg" alt="alert Icon" class="menu-icon" />
                  알림
                </RouterLink>
                <div class="divider" />
                <RouterLink class="dropdown-item" to="/likes">
                  <img src="@/assets/icons/profile/heart.svg" alt="모임찜 Icon" class="menu-icon" />
                  모임찜
                </RouterLink>
              </template>

              <template v-else-if="authStore.userRole === 'ADMIN'">
                <RouterLink class="dropdown-item" to="/admin/service">
                  <img
                    src="@/assets/icons/profile/service.svg"
                    alt="서비스관리 Icon"
                    class="menu-icon"
                  />
                  서비스관리
                </RouterLink>
              </template>

              <template v-else>
                <RouterLink class="dropdown-item" to="/notifications">
                  <img src="@/assets/icons/profile/alert.svg" alt="alert Icon" class="menu-icon" />
                  알림
                </RouterLink>
              </template>

              <div class="divider" />
              <button class="dropdown-item" @click="logout">
                <img
                  src="@/assets/icons/profile/logout.svg"
                  alt="로그아웃 Icon"
                  class="menu-icon"
                />
                로그아웃
              </button>
            </div>
          </transition>
        </li>
      </template>

      <template v-else>
        <li><RouterLink class="nav-link" to="/login">로그인/회원가입</RouterLink></li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
/* 레이아웃 */
.nav {
  @apply flex items-center;
}
.nav-list {
  @apply flex items-center space-x-4;
}
.nav-link {
  @apply text-text-default font-medium text-bodyMd relative py-1 transition hover:text-primary-default;
}
.profile-button {
  @apply flex items-center gap-2 px-3 py-2 bg-white rounded-full hover:bg-gray-100 transition;
}
.profile-image {
  @apply w-8 h-8 rounded-full;
}
.profile-name {
  @apply text-sm font-semibold text-gray-800;
}

/* 드롭다운 */
.dropdown-menu {
  @apply absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col z-50 overflow-hidden;
}
.dropdown-role {
  @apply flex items-center gap-2 p-4;
}
.role-icon {
  @apply w-5 h-5;
}
.menu-icon {
  @apply w-3 h-3;
}
.role-text {
  @apply text-base font-semibold text-gray-800;
}
.dropdown-item {
  @apply flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 text-left w-full;
}
.divider {
  @apply border-t border-gray-200;
}

/* 드롭다운 애니메이션 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

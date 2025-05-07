<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';

const props = defineProps({
  width: {
    type: String,
    default: '350px',
  },
  sidebarClass: {
    type: String,
    default: '',
  },
  mainClass: {
    type: String,
    default: '',
  },
});

const sidebarWidth = props.width;
const isSidebarOpen = ref(false);
const isMobile = ref(window.innerWidth <= 768);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) {
    isSidebarOpen.value = true; // 데스크탑이면 항상 열려 있음
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};
</script>

<template>
  <main class="layout">
    <!-- 모바일 햄버거 버튼 (오른쪽 상단) -->
    <button
      v-if="isMobile && !isSidebarOpen"
      class="hamburger"
      @click="toggleSidebar"
      aria-label="사이드바 열기"
    >
      ☰
    </button>
    <!-- 사이드바 -->
    <aside
      :style="{ width: sidebarWidth }"
      :class="[
        'sidebar',
        sidebarClass,
        { 'sidebar-open': isSidebarOpen && isMobile, 'sidebar-closed': !isSidebarOpen && isMobile },
      ]"
      aria-label="사이드바"
    >
      <!-- 모바일일 때 닫기 버튼 -->
      <button v-if="isMobile" class="close-btn" @click="closeSidebar" aria-label="사이드바 닫기">
        ✕
      </button>

      <slot name="sidebar" />
    </aside>

    <!-- 메인 콘텐츠 -->
    <section :class="`main-content ${mainClass}`" aria-label="메인 콘텐츠" @click="closeSidebar">
      <slot name="main" />
    </section>
  </main>
</template>

<style scoped>
.layout {
  @apply flex h-full relative;
}

/* 햄버거 버튼 */
.hamburger {
  @apply fixed top-[100px] right-4 z-40 p-2 text-2xl text-white bg-primary-default rounded-md shadow-md md:hidden;
}

/* 기본 사이드바 */
.sidebar {
  @apply relative flex-shrink-0 bg-background-surface border-r border-border-subtle overflow-y-auto transition-transform duration-300 z-30;
}

/* 데스크탑 */
@screen md {
  .sidebar {
    @apply static transform-none;
  }
}

/* 모바일: 사이드바 닫힘 */
.sidebar-closed {
  @apply -translate-x-full fixed top-0 left-0 w-full h-full bg-background-surface;
}

/* 모바일: 사이드바 열림 */
.sidebar-open {
  @apply translate-x-0 fixed top-0 left-0 w-full h-full bg-background-surface shadow-lg;
}

/* 모바일: 닫기 버튼 (사이드바 안에) */
.close-btn {
  @apply absolute top-4 right-4 p-2 text-2xl text-gray-800 bg-gray-100 rounded-full shadow-sm;
}

/* 메인 콘텐츠 */
.main-content {
  @apply flex-1 bg-background-default relative overflow-y-auto;
}
</style>

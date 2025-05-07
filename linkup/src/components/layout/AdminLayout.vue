<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminHeader from '@/features/admin/components/AdminHeader.vue'
import AdminSidebar from '@/features/admin/components/AdminSidebar.vue'
import { adminSidebarMap } from '@/features/admin/constants/adminSidebarMap.js' // 사이드바 정의 외부화

const route = useRoute()

// 현재 경로에 맞는 도메인별 사이드바 항목 계산
const sidebarItems = computed(() => {
  return Object.entries(adminSidebarMap).find(([prefix]) =>
    route.path.startsWith(prefix)
  )?.[1] || []
})

// 페이지 타이틀 계산: meta.title이 있으면 우선 사용
const pageTitle = computed(() =>
  route.meta?.title || sidebarItems.value.find(item => item.path === route.path)?.label || ''
)
</script>

<template>
  <div class="admin-wrapper">
    <!-- 헤더 영역 -->
    <header role="banner">
      <AdminHeader />
    </header>

    <div class="admin-container">
      <!-- 사이드바 메뉴 -->
      <aside role="complementary" aria-label="관리자 메뉴" class="sidebar">
        <AdminSidebar :menu-items="sidebarItems" />
      </aside>

      <!-- 메인 콘텐츠 영역 -->
      <main class="admin-main" role="main">
        <section :aria-labelledby="'admin-content-title'">
          <!-- 시각장애인을 위한 숨김 제목 -->
          <h2 id="admin-content-title" class="sr-only">{{ pageTitle }}</h2>
          <RouterView :page-title="pageTitle" />
        </section>
      </main>
    </div>
  </div>
</template>

 <style scoped>

</style>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminHeader from '@/features/admin/components/AdminHeader.vue'
import AdminSidebar from '@/features/admin/components/AdminSidebar.vue'

const route = useRoute()

// 도메인별 사이드바 메뉴 구성
const sidebarItems = computed(() => {
  if (route.path.startsWith('/admin/users')) {
    return [
      { label: '회원 목록 조회', path: '/admin/users/members' },
      { label: '권한 요청 목록', path: '/admin/users/authorities' },
      { label: '게시글 내역 조회', path: '/admin/users/posts' },
      { label: '댓글 내역 조회', path: '/admin/users/comments' }
    ]
  }
  if (route.path.startsWith('/admin/point')) {
    return [
      { label: '포인트 내역 조회', path: '/admin/points/points' },
      { label: '계좌 목록 조회', path: '/admin/points/accounts' }
    ]
  }
  if (route.path.startsWith('/admin/place')) {
    return [
      { label: '장소 목록 조회', path: '/admin/places/list' },
      { label: '장소 후기 조회', path: '/admin/places/reviews' }
    ]
  }
  if (route.path.startsWith('/admin/meeting')) {
    return [
      { label: '모임 목록 조회', path: '/admin/meetings/list' },
      { label: '참가자 평가 내역', path: '/admin/meetings/reviews' }
    ]
  }
  if (route.path.startsWith('/admin/report')) {
    return [
      { label: '신고 목록 조회', path: '/admin/reports/list' },
      { label: '신고 대상별 내역', path: '/admin/reports/targets' },
      { label: '신고자 목록 조회', path: '/admin/reports/reporters' },
      { label: '피신고자 목록 조회', path: '/admin/reports/reportees' }
    ]
  }
  if (route.path.startsWith('/admin/penalties')) {
    return [
      { label: '제재 내역 조회', path: '/admin/penalties/list' },
      { label: '이의 제기 내역 조회', path: '/admin/penalties/objections' },
      { label: '블랙리스트 조회', path: '/admin/penalties/blacklist' }
    ]
  }
  return []
})

// 현재 라우트에 맞는 label을 title로 사용
const pageTitle = computed(() => {
  const matched = sidebarItems.value.find(item => route.path === item.path)
  return matched?.label || ''
})

</script>


<template>
  <div class="admin-wrapper">
    <AdminHeader />
    <div class="admin-container">
      <AdminSidebar :menu-items="sidebarItems" />
      <main class="admin-main">
        <RouterView :page-title="pageTitle" />
      </main>
    </div>
  </div>
</template>


<style scoped>

</style>

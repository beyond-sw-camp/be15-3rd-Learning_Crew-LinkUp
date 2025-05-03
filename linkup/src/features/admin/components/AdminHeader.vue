<script setup>
import { useRoute } from 'vue-router'
import '@/assets/css/admin-styles.css'

const route = useRoute()

const navItems = [
  { label: '회원 관리', path: '/admin/users' },
  { label: '포인트 관리', path: '/admin/points' },
  { label: '모임 관리', path: '/admin/meetings' },
  { label: '장소 관리', path: '/admin/places' },
  { label: '신고 관리', path: '/admin/reports' },
  { label: '제재 관리', path: '/admin/penalties' }
]

const isActive = (path) => route.path.startsWith(path)
</script>

<template>
  <header class="admin-header" role="banner">
    <h1 class="header-left">서비스 관리</h1>
    <nav class="admin-nav" aria-label="관리자 내비게이션">
      <ul>
        <li v-for="item in navItems" :key="item.path">
          <RouterLink
              :to="item.path"
              class="nav-link"
              :class="{ active: isActive(item.path) }"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* ul, li가 리스트 스타일로 보이지 않게 하기 위한 기본 설정 */
.admin-nav ul {
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
}

.admin-nav li {
  margin: 0;
}
</style>

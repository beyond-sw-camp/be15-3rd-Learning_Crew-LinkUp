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
    <div class="header-left" aria-label="서비스 이름">서비스 관리</div>
    <nav class="admin-nav" role="navigation" aria-label="관리자 메뉴">
      <ul class="admin-nav-list">
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

</style>

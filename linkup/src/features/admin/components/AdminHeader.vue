<script setup>
import { useRoute } from 'vue-router'
import '@/assets/css/admin-styles.css'

const route = useRoute()

const navItems = [
  { label: '회원 관리', path: '/admin/users/members' },
  { label: '포인트 관리', path: '/admin/point/points' },
  { label: '모임 관리', path: '/admin/meeting/list' },
  { label: '장소 관리', path: '/admin/place/list' },
  { label: '신고 관리', path: '/admin/report/list' },
  { label: '제재 관리', path: '/admin/penalty/list' }
]

const isActive = (path) => route.path.startsWith(path)
</script>


<template>
  <header class="admin-header">
    <div class="header-left">서비스 관리</div>
    <nav class="admin-nav">
      <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>


<style scoped>

</style>

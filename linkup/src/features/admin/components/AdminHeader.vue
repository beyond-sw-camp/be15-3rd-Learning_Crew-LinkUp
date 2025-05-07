<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { adminNavItems } from '@/features/admin/constants/adminNavItems.js'
import '@/assets/css/admin-styles.css'

const route = useRoute()

// 현재 경로에 해당하는 네비게이션 활성화 상태 계산
const activePath = computed(() =>
  adminNavItems.find(item => route.path.startsWith(item.path))?.path
)
</script>

<template>
  <header class="admin-header" role="banner">
    <div class="header-left" aria-label="서비스 이름">서비스 관리</div>
    <nav class="admin-nav" role="navigation" aria-label="관리자 메뉴">
      <ul class="admin-nav-list">
        <li v-for="item in adminNavItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="nav-link"
            :class="{ active: activePath === item.path }"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

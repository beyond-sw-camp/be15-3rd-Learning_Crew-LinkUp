<script setup>
import { useRoute } from 'vue-router'
import '@/assets/css/admin-styles.css'

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
})

const route = useRoute()
const isActive = (path) => route.path.startsWith(path)
</script>

<template>
  <aside class="admin-sidebar" aria-label="관리자 사이드 메뉴">
    <nav class="sidebar-content" role="navigation">
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="sidebar-link"
            :class="{ active: isActive(item.path) }"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <footer class="sidebar-footer" role="contentinfo">
      <RouterLink to="/" class="return-link">서비스로 돌아가기</RouterLink>
    </footer>
  </aside>
</template>

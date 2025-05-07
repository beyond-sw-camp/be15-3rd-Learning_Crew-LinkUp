<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import '@/assets/css/admin-styles.css'

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
})

const route = useRoute()

// 현재 경로 기준으로 활성 메뉴 path
const activePath = computed(() =>
  props.menuItems.find(item => route.path.startsWith(item.path))?.path
)
</script>

<template>
  <aside class="admin-sidebar" aria-label="관리자 사이드 메뉴">
    <nav class="sidebar-content" role="navigation">
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="sidebar-link"
            :class="{ active: item.path === activePath }"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- 푸터 링크 -->
    <footer class="sidebar-footer" role="contentinfo">
      <RouterLink to="/" class="return-link">서비스로 돌아가기</RouterLink>
    </footer>
  </aside>
</template>

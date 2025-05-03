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
  <aside class="admin-sidebar">
    <div class="sidebar-content">
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
    </div>
    <div class="sidebar-footer">
      <RouterLink to="/" class="return-link">서비스로 돌아가기</RouterLink>
    </div>
  </aside>
</template>


<style scoped>

</style>

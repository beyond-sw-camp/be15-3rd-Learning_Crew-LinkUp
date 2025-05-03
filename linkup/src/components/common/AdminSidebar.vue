<script setup>
import { useRoute } from 'vue-router'
import { defineProps } from 'vue'

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
.admin-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 220px;
  height: 100vh;
  background-color: #f9f8fb;
  padding: 20px 16px;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
}

.sidebar-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  display: block;
  font-weight: 500;
  color: #555;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.sidebar-link.active {
  background-color: #e8e4f7;
}

.sidebar-footer {
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: center;
}

.return-link {
  color: #555;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.return-link:hover {
  color: #333;
}
</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  maxVisible: {
    type: Number,
    default: 10
  }
})
const emit = defineEmits(['update:page'])

const goToFirstPage = () => emit('update:page', 1)
const goToPrevPage = () => emit('update:page', props.currentPage - 1)
const goToNextPage = () => emit('update:page', props.currentPage + 1)
const goToLastPage = () => emit('update:page', props.totalPages)

const visiblePages = computed(() => {
  const half = Math.floor(props.maxVisible / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = start + props.maxVisible - 1

  if (end > props.totalPages) {
    end = props.totalPages
    start = Math.max(1, end - props.maxVisible + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>


<template>
  <div class="pagination">
    <button class="page-btn" @click="goToFirstPage" :disabled="currentPage === 1">«</button>
    <button class="page-btn" @click="goToPrevPage" :disabled="currentPage === 1">‹</button>

    <button
        v-for="page in visiblePages"
        :key="page"
        @click="$emit('update:page', page)"
        :class="['page-btn', { active: page === currentPage }]"
    >
      {{ page }}
    </button>

    <button class="page-btn" @click="goToNextPage" :disabled="currentPage === totalPages">›</button>
    <button class="page-btn" @click="goToLastPage" :disabled="currentPage === totalPages">»</button>
  </div>
</template>


<style scoped>
.pagination {
  text-align: center;
  margin-top: 8px;
}

.page-btn,
.page-nav {
  border: none;
  background-color: #fff;
  color: #333;
  padding: 8px 14px;
  margin: 0 3px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.page-btn:hover,
.page-nav:hover {
  background-color: #dcd5f2;
}

.page-btn.active {
  background-color: #b7a6e4;
  color: #fff;
  font-weight: 600;
}
</style>

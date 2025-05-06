<script setup>
import { computed } from 'vue'
import '@/assets/css/admin-styles.css'

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

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<template>
  <nav class="pagination" role="navigation" aria-label="페이지 네비게이션">
    <ul class="pagination-list">
      <li>
        <button
          class="page-btn page-nav"
          @click="goToFirstPage"
          :disabled="currentPage === 1"
          aria-label="첫 페이지"
        >
          «
        </button>
      </li>
      <li>
        <button
          class="page-btn page-nav"
          @click="goToPrevPage"
          :disabled="currentPage === 1"
          aria-label="이전 페이지"
        >
          ‹
        </button>
      </li>

      <li v-for="page in visiblePages" :key="page">
        <button
          type="button"
          class="page-btn page-nav"
          :class="{ active: page === currentPage }"
          :aria-current="page === currentPage ? 'page' : null"
          @click="$emit('update:page', page)"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          class="page-btn page-nav"
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          aria-label="다음 페이지"
        >
          ›
        </button>
      </li>
      <li>
        <button
          class="page-btn page-nav"
          @click="goToLastPage"
          :disabled="currentPage === totalPages"
          aria-label="마지막 페이지"
        >
          »
        </button>
      </li>
    </ul>
  </nav>
</template>

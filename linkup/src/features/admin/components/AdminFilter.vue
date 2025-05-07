<script setup>
import { computed } from 'vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

const props = defineProps({
  title: String
})

const emit = defineEmits(['search'])

// 빈 문자열 방지
const hasTitle = computed(() => props.title?.trim())
const triggerSearch = () => emit('search')
</script>

<template>
  <section class="filter-wrapper" role="search" aria-labelledby="filter-title">
    <!-- 페이지 제목 (필요 시만 표시) -->
    <h1 v-if="hasTitle" id="filter-title" class="page-title">
      {{ props.title }}
    </h1>

    <!-- 검색 필터 -->
    <form class="filter-box" @submit.prevent="triggerSearch">
      <fieldset class="filter-fields">
        <legend class="sr-only">필터 조건 입력 영역</legend>
        <slot name="filters" />
      </fieldset>
      <AdminButton type="primary" aria-label="검색 버튼">검색</AdminButton>
    </form>
  </section>
</template>

<style scoped>

</style>

<script setup>
import { computed } from 'vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

const props = defineProps({
  title: String,
  filters: Object //  명시적으로 filters 받아오기
})

const emit = defineEmits(['search'])

const hasTitle = computed(() => props.title?.trim())
const triggerSearch = () => emit('search')
</script>

<template>
  <section class="filter-wrapper" role="search" aria-labelledby="filter-title">
    <!-- 제목이 있을 경우만 렌더링 -->
    <h1 v-if="hasTitle" id="filter-title" class="page-title">
      {{ props.title }}
    </h1>

    <form class="filter-box" @submit.prevent="triggerSearch">
      <fieldset class="filter-fields">
        <legend class="sr-only">필터 조건 입력 영역</legend>
        <!-- scoped slot으로 filters 명시적 전달 -->
        <slot name="filters" :filters="filters" />
      </fieldset>
      <AdminButton type="primary" aria-label="검색 버튼">검색</AdminButton>
    </form>
  </section>
</template>

<style scoped>
/* 스타일은 admin-styles.css에서 일괄 관리되므로 생략 가능 */
</style>

<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue"
import { computed } from 'vue';

const props = defineProps({ title: String })
const emit = defineEmits(['search'])

// title 유효성 확인을 computed로 추출
const hasTitle = computed(() => props.title?.trim())

const triggerSearch = () => emit('search')
</script>

<template>
  <section class="filter-wrapper" role="search" aria-labelledby="filter-title">
    <!-- 조건부 타이틀 렌더링 -->
    <h1 v-if="hasTitle" class="page-title" id="filter-title">{{ props.title }}</h1>

    <!-- 검색 필터 폼 -->
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

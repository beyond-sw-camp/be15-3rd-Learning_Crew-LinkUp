<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue"

defineProps({ title: String })
const emit = defineEmits(['search'])

const triggerSearch = () => emit('search')
</script>

<template>
  <section class="filter-wrapper" role="search" aria-labelledby="filter-title">
    <h1 class="page-title" v-if="title?.trim()" id="filter-title">{{ title }}</h1>
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
/* 역할별 스타일은 admin-styles.css에서 관리 */
</style>

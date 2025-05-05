<!-- src/features/admin/components/AdminFilter.vue -->
<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue";
import '@/assets/css/admin-styles.css'

defineProps({ title: String })

const emit = defineEmits(['search'])
const onSearch = () => emit('search')
</script>

<template>
  <section class="filter-wrapper">
    <h1 class="page-title" v-if="title">{{ title }}</h1>
    <form class="filter-box" @submit.prevent="onSearch">
      <slot name="filters" />
      <AdminButton type="primary" @click="onSearch">검색</AdminButton>
    </form>
  </section>
</template>

<style scoped>
/* 필터 스타일 필요시 여기에 작성 */
</style>

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
      <slot />
      <AdminButton type="primary" @click="onSearch">검색</AdminButton>
    </form>
  </section>
</template>

<style scoped>
</style>

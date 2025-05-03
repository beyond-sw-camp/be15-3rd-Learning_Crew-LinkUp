<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue";
import '@/assets/css/admin-styles.css'

defineProps({ title: String })

const emit = defineEmits(['search'])
const onSearch = () => emit('search')
</script>


<template>
  <div class="filter-wrapper">
    <h1 class="page-title" v-if="title">{{ title }}</h1>
    <div class="filter-box">
      <slot />
      <AdminButton type="primary" @click="$emit('search')">검색</AdminButton>
    </div>
  </div>
</template>


<style scoped>

</style>

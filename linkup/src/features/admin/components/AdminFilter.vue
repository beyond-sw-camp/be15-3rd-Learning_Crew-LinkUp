<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue";

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


<style>
.filter-wrapper {
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.filter-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
}

.filter-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 6px;
}

.select-box {
  margin-left: 12px;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
}
.id-input {
  width: 50px;
}
</style>

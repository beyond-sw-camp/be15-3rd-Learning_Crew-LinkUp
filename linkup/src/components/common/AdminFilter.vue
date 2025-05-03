<script setup>
const emit = defineEmits(['search'])

const onSearch = () => {
  emit('search')
}
</script>


<template>
  <div class="filter-box">
    <slot />
    <button class="btn btn-primary" @click="onSearch">검색</button>
  </div>
</template>


<style>
.filter-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 24px;
}

.filter-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 6px;
}

.select-box {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
}

.id-input {
  width: 80px;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>

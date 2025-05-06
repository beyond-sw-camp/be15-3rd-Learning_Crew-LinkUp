<!-- src/features/place/components/PlaceFilter.vue -->
<template>
  <div class="filter-box">
    <div class="filter-row">
      <label>지역:</label>
      <select v-model="localFilter.region">
        <option>전체</option>
        <option>서울</option>
      </select>

      <select v-model="localFilter.subRegion">
        <option>전체</option>
        <option>강남</option>
        <option>서대문</option>
      </select>

      <select v-model="localFilter.category">
        <option>전체</option>
        <option>풋살</option>
        <option>농구</option>
      </select>

      <button @click="applyFilter">검색</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const emit = defineEmits(['filter-change']);
const props = defineProps({
  modelValue: Object,
});

const localFilter = reactive({
  region: props.modelValue?.region || '전체',
  subRegion: props.modelValue?.subRegion || '전체',
  category: props.modelValue?.category || '전체',
});

function applyFilter() {
  emit('filter-change', { ...localFilter });
}
</script>

<style scoped>
.filter-box {
  margin-bottom: 20px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.filter-row select,
.filter-row button {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>

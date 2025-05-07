<template>
  <div class="filter-wrapper">
    <div class="filter-group">
      <label class="filter-label">지역 :</label>
      <select class="select-box" v-model="mainRegion">
        <option value="">전체</option>
        <option v-for="(subs, main) in areas" :key="main" :value="main">
          {{ main }}
        </option>
      </select>

      <select class="select-box" v-model="subRegion">
        <option value="">전체</option>
        <option v-for="sub in currentSubList" :key="sub" :value="sub">
          {{ sub }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label">운동 :</label>
      <select class="select-box" v-model="sportId">
        <option value="">전체</option>
        <option
          v-for="sport in sportList"
          :key="sport.id"
          :value="sport.id"
        >
          {{ sport.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue']);

const areas = {
  서울: ['강남', '건대입구', '가양', '노원', '도곡', '신림', '영등포'],
  '경기/인천': ['수원', '성남', '고양', '인천', '부천'],
  '충청/대전': ['대전', '천안', '청주'],
  '전라/광주': ['광주', '전주', '목포'],
  '경북/대구': ['대구', '구미', '포항'],
  '경남/부산/울산': ['부산', '울산', '창원'],
  강원: ['춘천', '강릉'],
  제주: ['제주시', '서귀포시'],
};

// 운동 ID와 이름 매핑
const sportList = [
  { id: 1, name: '기타 운동' },
  { id: 2, name: '풋살' },
  { id: 3, name: '테니스' },
  { id: 4, name: '볼링' },
  { id: 5, name: '탁구' },
  { id: 6, name: '농구' },
  { id: 7, name: '골프' },
  { id: 8, name: '배드민턴' },
];

const mainRegion = computed({
  get: () => props.modelValue.region,
  set: (val) =>
    emit('update:modelValue', {
      ...props.modelValue,
      region: val,
      subRegion: '',
    }),
});

const subRegion = computed({
  get: () => props.modelValue.subRegion,
  set: (val) =>
    emit('update:modelValue', {
      ...props.modelValue,
      subRegion: val,
    }),
});

const sportId = computed({
  get: () => props.modelValue.sportId,
  set: (val) =>
    emit('update:modelValue', {
      ...props.modelValue,
      sportId: val,
    }),
});

const currentSubList = computed(() =>
  mainRegion.value && areas[mainRegion.value] ? areas[mainRegion.value] : []
);
</script>

<style scoped>
.filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.select-box {
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 999px;
  border: 1.5px solid #dcdfe5;
  background: #f9fafb;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23666' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px 14px;
  cursor: pointer;
  min-width: 110px;
  transition: all 0.2s ease;
}

.select-box:hover {
  background: #eef2f7;
  border-color: #cbd5e1;
}

.select-box:focus {
  outline: none;
  border-color: #5790ff;
  background: #fff;
}
</style>

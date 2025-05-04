<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const areas = {
  '서울': ['강남', '건대입구', '가양', '노원', '도곡', '신림', '영등포'],
  '경기/인천': ['수원', '성남', '고양', '인천', '부천'],
  '충청/대전': ['대전', '천안', '청주'],
  '전라/광주': ['광주', '전주', '목포'],
  '경북/대구': ['대구', '구미', '포항'],
  '경남/부산/울산': ['부산', '울산', '창원'],
  '강원': ['춘천', '강릉'],
  '제주': ['제주시', '서귀포시']
}

const mainRegion = ref('')
const subRegion = ref('')

const currentSubList = computed(() =>
  mainRegion.value ? areas[mainRegion.value] : []
)

function onMainChange() {
  subRegion.value = ''
  emit('update:modelValue', '')
}

function onSubChange() {
  emit('update:modelValue', subRegion.value)
}

watch(() => props.modelValue, (val) => {
  for (const [main, subs] of Object.entries(areas)) {
    if (subs.includes(val)) {
      mainRegion.value = main
      subRegion.value = val
      return
    }
  }
  mainRegion.value = ''
  subRegion.value = ''
})
</script>


<template>
  <div class="sport-select-wrapper">
    <label class="sport-select-label" for="sport-select">운동 종류:</label>
    <div class="region-dropdown-row">
      <select class="select-box" v-model="mainRegion" @change="onMainChange">
        <option value="">전체</option>
        <option v-for="(subs, main) in areas" :key="main" :value="main">
          {{ main }}
        </option>
      </select>

      <select class="select-box" v-model="subRegion" @change="onSubChange">
        <option value="">전체</option>
        <option v-for="sub in currentSubList" :key="sub" :value="sub">
          {{ sub }}
        </option>
      </select>
    </div>
  </div>
</template>


<style scoped>
.sport-select-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-direction: column;
}

.region-dropdown-row {
  display: flex;
  gap: 5px;
}

.select-box {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 12px;
  border: 1.5px solid #dcdfe5;
  background: #fff;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23333' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px 14px;
  cursor: pointer;
  min-width: 110px;
}
</style>

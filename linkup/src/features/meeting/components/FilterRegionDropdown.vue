<template>
  <div class="region-selector">
    <!-- 선택된 지역 요약 -->
    <div class="region-selected-row">
      <button class="region-btn main-region-btn" @click="toggleDropdown">
        {{ selectedMain }}
      </button>
      <button class="region-btn sub-region-btn" @click="toggleDropdown">
        {{ selectedSub }}
      </button>
    </div>

    <!-- 드롭다운 -->
    <div v-show="showDropdown" class="region-dropdown-scroll">
      <!-- 시/도 목록 -->
      <div class="region-category-list scroll">
        <ul>
          <li
            v-for="[area] in areaList"
            :key="area"
            :class="{ active: selectedMain === area }"
            @click="selectMain(area)"
          >
            {{ area }}
          </li>
        </ul>
      </div>

      <!-- 시/군/구 목록 -->
      <div class="region-subcategory-list scroll" ref="subListRef">
        <ul>
          <li
            v-for="sub in currentSubList"
            :key="sub"
            :class="{ active: selectedSub === sub }"
            @click="selectSub(sub)"
          >
            {{ sub }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

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

const selectedMain = ref('전체')
const selectedSub = ref('전체')
const showDropdown = ref(false)
const subListRef = ref(null)

const areaList = Object.entries(areas)
const currentSubList = computed(() =>
  selectedMain.value === '전체' ? [] : areas[selectedMain.value] || []
)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function selectMain(area) {
  selectedMain.value = area
  selectedSub.value = '전체'
}

function selectSub(sub) {
  selectedSub.value = sub
  emit('update:modelValue', sub)
  showDropdown.value = false

  nextTick(() => {
    const activeEl = subListRef.value?.querySelector('.active')
    activeEl?.scrollIntoView({ behavior: 'auto', block: 'center' })
  })
}

watch(() => props.modelValue, (val) => {
  for (const [main, subs] of areaList) {
    if (subs.includes(val)) {
      selectedMain.value = main
      selectedSub.value = val
      return
    }
  }
  selectedMain.value = '전체'
  selectedSub.value = '전체'
})
</script>

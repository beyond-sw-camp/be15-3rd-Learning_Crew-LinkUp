<script setup>
import { computed, ref, watch } from 'vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'

// Props
const props = defineProps({
  title: String,
  filters: Object
})

const emit = defineEmits(['search', 'update:filters'])

// 제목 여부 확인
const hasTitle = computed(() => props.title?.trim())

//    로컬 복사본 생성 (props.filters는 반응형 아님)
const localFilters = ref({ ...props.filters })

//    localFilters 변경 시 부모로 emit
watch(localFilters, (newVal) => {
  emit('update:filters', newVal)
}, { deep: true })

// 검색 버튼 클릭 시 emit
const triggerSearch = () => {
  console.log('[AdminFilter] 검색 버튼 눌림') // 디버깅용
  emit('search')
}
</script>

<template>
  <section class="filter-wrapper" role="search" aria-labelledby="filter-title">
    <!-- 제목 -->
    <h1 v-if="hasTitle" id="filter-title" class="page-title">
      {{ props.title }}
    </h1>

    <!-- 필터 form -->
    <form class="filter-box" @submit.prevent="triggerSearch">
      <fieldset class="filter-fields">
        <legend class="sr-only">필터 조건 입력 영역</legend>

        <!-- scoped slot: 로컬 filters 전달 -->
        <slot name="filters" :filters="localFilters" />
      </fieldset>

      <!-- 검색 버튼 -->
      <AdminButton
        type="primary"
        aria-label="검 버튼"
        native-type="submit"
      >
        검색
      </AdminButton>
    </form>
  </section>
</template>

<style scoped>
/* 외부 admin-styles.css 사용 */
</style>

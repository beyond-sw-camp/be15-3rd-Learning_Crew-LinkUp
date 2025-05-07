<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from './AdminFilter.vue'
import AdminTable from './AdminTable.vue'
import Pagination from './Pagination.vue'

const props = defineProps({
  fetchFn: { type: Function, required: true },
  columns: { type: Array, required: true },
  initFilters: { type: Object, default: () => ({}) },
  showFilter: { type: Boolean, default: true },
  enableModal: { type: Boolean, default: false },
  pageTitle: { type: String, default: '' }
})

const emit = defineEmits(['update:page'])

const filters = ref({ ...props.initFilters })
const rows = ref([])
const page = ref(1)
const totalPages = ref(1)
const selected = ref(null)

// 필터를 사용할 수 있게 두 가지 방식으로 처리 (파라미터와 JSON 방식)
const formatFilters = (filters) => {
  const formatted = { ...filters }

  // JSON 처리 및 undefined, 빈 문자열 제거
  Object.keys(formatted).forEach(key => {
    if (formatted[key] === undefined || formatted[key] === '') {
      delete formatted[key]
    }
  })

  return formatted
}


// 데이터를 처리하는 범용 함수 (재사용성 고려)
const processResponseData = (response) => {
  // 데이터가 예상하는 형태인지 확인
  const rows = response?.data?.data?.content || response?.data || response?.list || []
  const totalPages = response?.data?.data?.totalPages || 1
  const currentPage = response?.data?.data?.currentPage || 1
  return { rows, totalPages, currentPage }
}

// fetchList 함수에서 호출
const fetchList = async (params = {}) => {
  page.value = params.page || 1
  try {
    const formattedParams = formatFilters(params) // 필터링
    const res = await props.fetchFn(formattedParams)

    // 응답 처리
    const { rows: fetchedRows, totalPages: fetchedTotalPages } = processResponseData(res)

    rows.value = fetchedRows  // 포인트 거래 내역을 rows에 할당
    totalPages.value = fetchedTotalPages  // 총 페이지 수 할당
    emit('update:page', page.value)
  } catch (e) {
    console.error('🔴 fetchList error:', e)
    rows.value = []
    totalPages.value = 1
  }
}



const handleRowClick = (row) => {
  if (props.enableModal) selected.value = row
}

const closeModal = () => {
  selected.value = null
}

const format = (value, formatter, row) =>
  typeof formatter === 'function' ? formatter(value, row) : value

//초기 로드
onMounted(() => fetchList({ ...filters.value, page: 1 }))
</script>

<template>
  <div class="main-admin">
    <!-- 필터 영역 -->
    <section class="filter-wrapper" aria-label="필터 섹션">
      <h2 class="page-title">{{ pageTitle || '관리 목록' }}</h2>

      <AdminFilter
        v-if="showFilter"
        :filters="filters"
        @update:filters="v => (filters.value = v)"
        @search="() => fetchList({ ...filters.value, page: 1 })"
      >
        <template #filters="{ filters }">
          <slot name="filters" :filters="filters" />
        </template>
      </AdminFilter>
    </section>

    <!-- 테이블 -->
    <section aria-label="데이터 테이블">
      <AdminTable @row-click="handleRowClick">
        <template #thead>
          <tr>
            <th v-for="col in columns" :key="col.key" scope="col">
              {{ col.label }}
            </th>
          </tr>
        </template>

        <template #tbody>
          <tr
            v-for="(row, idx) in rows"
            :key="row.id ?? row.userId ?? row.memberId ?? row.targetId ?? row.reporterId ?? row.ownerId ?? idx"
          >
            <td v-for="col in columns" :key="col.key">
              <template v-if="col.format && format(row[col.key], col.format, row)?.type === 'button'">
                <button
                  type="button"
                  class="text-button"
                  @click="format(row[col.key], col.format, row).onClick?.()"
                  :aria-label="format(row[col.key], col.format, row).label"
                >
                  {{ format(row[col.key], col.format, row).label }}
                </button>
              </template>
              <template v-else>
                {{ format(row[col.key], col.format, row) ?? '-' }}
              </template>
            </td>
          </tr>
        </template>
      </AdminTable>
    </section>

    <!-- 페이지네이션 -->
    <nav aria-label="페이지 이동">
      <Pagination
        :current-page="page"
        :total-pages="totalPages"
        @update:page="newPage => fetchList({ ...filters.value, page: newPage })"
      />
    </nav>

    <!-- 상세 모달 영역 -->
    <slot name="modal" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
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

// 필터, 페이징, 데이터 상태
const filters = ref({ ...props.initFilters })
const rows = ref([])
const page = ref(1)
const totalPages = ref(1)
const selected = ref(null)

// 리스트 조회
const fetchList = async (newPage = 1) => {
  page.value = newPage
  try {
    const res = await props.fetchFn({ ...filters.value, page: newPage })
    rows.value = res.data || res.list || []
    totalPages.value = res.totalPages || 1
    emit('update:page', newPage)
  } catch {
    rows.value = []
    totalPages.value = 1
  }
}

// 행 클릭 시 모달 열기
const handleRowClick = (row) => {
  if (props.enableModal) selected.value = row
}

// 모달 닫기
const closeModal = () => {
  selected.value = null
}

// 셀 포맷 처리
const format = (value, formatter, row) =>
  typeof formatter === 'function' ? formatter(value, row) : value

// 초기 조회
onMounted(() => fetchList(1))
</script>

<template>
  <div class="main-admin">
    <!-- 필터 영역 -->
    <section class="filter-wrapper" aria-label="필터 섹션">
      <h2 class="page-title">{{ pageTitle || '관리 목록' }}</h2>
      <AdminFilter
        v-if="showFilter"
        :title="null"
        @search="fetchList(1)"
      >
        <template #filters>
          <slot name="filters" />
        </template>
      </AdminFilter>
    </section>

    <!-- 테이블 영역 -->
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
        @update:page="fetchList"
      />
    </nav>

    <!-- 모달 영역 -->
    <slot name="modal" />
  </div>
</template>

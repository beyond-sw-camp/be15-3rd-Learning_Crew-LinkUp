<script setup>
import { reactive, ref, onMounted } from 'vue'
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

const filters = reactive({ ...props.initFilters })
const rows = ref([])
const page = ref(1)
const totalPages = ref(1)
const selected = ref(null)

function fetchList(newPage = 1) {
  page.value = newPage
  props.fetchFn({ ...filters, page: newPage }).then((res) => {
    rows.value = res.data || res.list || []
    totalPages.value = res.totalPages || 1
  })
}

function handleRowClick(row) {
  if (props.enableModal) selected.value = row
}

function closeModal() {
  selected.value = null
}

function format(value, formatter, row) {
  return typeof formatter === 'function' ? formatter(value, row) : value
}

onMounted(() => fetchList(1))
</script>

<template>
  <div class="main-admin">
    <!-- 제목 -->
    <div class="filter-wrapper">
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
    </div>

    <!-- 테이블 -->
    <AdminTable @row-click="handleRowClick">
      <template #thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="(row, idx) in rows" :key="row.targetId || row.reporterId || row.userId || row.ownerId || row.id || idx">
          <td v-for="col in columns" :key="col.key">
            <template v-if="typeof format(row[col.key], col.format, row) === 'object' && format(row[col.key], col.format, row).type === 'button'">
              <button
                type="button"
                class="text-button"
                @click="format(row[col.key], col.format, row).onClick?.()"
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

    <!-- 페이지네이션 -->
    <Pagination
      :current-page="page"
      :total-pages="totalPages"
      @update:page="fetchList"
    />

    <!-- 모달 슬롯 -->
    <slot name="modal" />
  </div>
</template>

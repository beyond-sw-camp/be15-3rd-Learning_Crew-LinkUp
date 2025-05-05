<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import ReportDetailModal from '@/features/admin/components/ReportDetailModal.vue'
// import { fetchReportedTargetList, fetchTargetDetailById } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const pageTitle = '신고 대상별 목록 조회'

const filters = ref({ isActive: '', searchType: '', searchKeyword: '' })
const targetList = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)
const isModalOpen = ref(false)
const summaryInfo = ref([])
const reportRows = ref([])

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    // const { data } = await fetchReportedTargetList({
    //   ...filters.value,
    //   page: page.value
    // })
    // targetList.value = data.targetList || []
    // totalPages.value = data.pagination?.totalPage || 1

    // 임시 데이터
    targetList.value = [
      {
        targetType: 'USER',
        targetId: 101,
        reportCount: 3,
        lastReportDate: '2025-04-25T14:30:00',
        isActive: 'Y'
      },
      {
        targetType: 'POST',
        targetId: 102,
        reportCount: 2,
        lastReportDate: '2025-04-24T16:10:00',
        isActive: 'N'
      }
    ]
    totalPages.value = 1
  } catch (err) {
    error.value = '데이터를 불러오는데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const openDetailModal = async (row) => {
  try {
    // const { data } = await fetchTargetDetailById(row.targetType, row.targetId)
    // summaryInfo.value = [...]
    // reportRows.value = data.reportList || []

    // 임시 데이터
    summaryInfo.value = [
      { label: '대상 유형', value: row.targetType },
      { label: '대상 ID', value: row.targetId },
      { label: '신고 횟수', value: row.reportCount },
      { label: '최근 신고일', value: formatDate(row.lastReportDate) },
      { label: '활성화 여부', value: row.isActive }
    ]
    reportRows.value = [
      {
        reportId: 201,
        reporterId: 21,
        reporterName: '김지민',
        reportType: '욕설 및 비방',
        createdAt: '2025-04-01 10:15',
        status: '처리중'
      },
      {
        reportId: 202,
        reporterId: 22,
        reporterName: '윤다현',
        reportType: '허위 정보 게시',
        createdAt: '2025-04-06 09:00',
        status: '처리완료'
      }
    ]
    isModalOpen.value = true
  } catch (err) {
    alert('상세 정보를 불러오지 못했습니다.')
  }
}

const onSearch = () => {
  page.value = 1
  fetchData()
}

const handleAction = () => {
  alert('제재 처리를 수행합니다.')
  isModalOpen.value = false
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('ko-KR')
}

onMounted(fetchData)
</script>

<template>
  <main>
    <!-- 필터 영역 -->
    <section aria-label="신고 대상 필터">
      <AdminFilter @search="onSearch" :title="pageTitle">
        <label class="filter-label">
          활성화 여부:
          <select v-model="filters.isActive" class="select-box">
            <option value="">전체</option>
            <option value="Y">활성화</option>
            <option value="N">비활성화</option>
          </select>
        </label>
        <label class="filter-label">
          검색 기준:
          <select v-model="filters.searchType" class="select-box">
            <option value="userId">사용자 ID</option>
            <option value="postId">게시글 ID</option>
            <option value="commentId">댓글 ID</option>
          </select>
        </label>
        <input type="text" v-model="filters.searchKeyword" class="select-box id-input" placeholder="ID" />
      </AdminFilter>
    </section>

    <!-- 테이블 -->
    <section aria-label="신고 대상 목록">
      <div v-if="loading">로딩 중...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="targetList.length === 0">데이터가 없습니다.</div>

      <article v-else>
        <AdminTable>
          <template #thead>
            <tr>
              <th>대상 유형</th>
              <th>대상 ID</th>
              <th>신고 횟수</th>
              <th>최근 신고일</th>
              <th>활성화 여부</th>
              <th>신고 내역</th>
            </tr>
          </template>
          <template #tbody>
            <tr v-for="row in targetList" :key="row.targetId + row.targetType">
              <td>{{ row.targetType }}</td>
              <td>{{ row.targetId }}</td>
              <td>{{ row.reportCount }}</td>
              <td>{{ formatDate(row.lastReportDate) }}</td>
              <td>{{ row.isActive }}</td>
              <td><a href="#" @click.prevent="openDetailModal(row)">보기</a></td>
            </tr>
          </template>
        </AdminTable>

        <Pagination
          :current-page="page"
          :total-pages="totalPages"
          @update:page="p => { page = p; fetchData() }"
        />
      </article>
    </section>

    <!-- 상세 모달 -->
    <ReportDetailModal
      v-model="isModalOpen"
      :modal-title="'신고 대상 상세 정보'"
      :modal-description="'해당 신고 대상에 대한 상세 신고 이력을 확인할 수 있습니다.'"
      :summary-info="summaryInfo"
      :columns="['신고 ID', '신고자 ID', '신고자 이름', '신고 유형', '신고 일시', '처리 상태']"
      :column-keys="['reportId', 'reporterId', 'reporterName', 'reportType', 'createdAt', 'status']"
      :report-rows="reportRows"
      :show-action-button="true"
      action-label="제재 처리"
      @action="handleAction"
    />
  </main>
</template>

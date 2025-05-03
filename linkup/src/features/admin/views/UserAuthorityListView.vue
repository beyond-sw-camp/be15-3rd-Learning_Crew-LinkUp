<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
import AdminButton from '@/features/admin/components/AdminButton.vue'
import AdminModal from '@/features/admin/components/AdminModal.vue'
// import { updateUserAuthorityStatus, fetchUserAuthorityRequests } from '@/api/admin.js'
import '@/assets/css/admin-styles.css'

const props = defineProps({ pageTitle: String })

const filters = ref({ status: '', userId: '' })
const requests = ref([])
const page = ref(1)
const totalPages = ref(1)
const isModalOpen = ref(false)
const selectedRequest = ref(null)
const decision = ref('')
const rejectReason = ref('')
const loading = ref(false)
const error = ref(null)

/*
   더미 데이터 (임시 출력용)
*/
const dummyData = [
  {
    ownerId: 'user001',
    userName: '홍길동',
    email: 'user001@example.com',
    status: 'PENDING',
    authorizedAt: null,
    rejectionReason: '',
    business_registration_document_url: '/default-image.png'
  },
  {
    ownerId: 'user002',
    userName: '이순신',
    email: 'user002@example.com',
    status: 'ACCEPTED',
    authorizedAt: '2024-03-01',
    rejectionReason: '',
    business_registration_document_url: '/default-image.png'
  },
  {
    ownerId: 'user003',
    userName: '강감찬',
    email: 'user003@example.com',
    status: 'REJECTED',
    authorizedAt: null,
    rejectionReason: '서류 불충분',
    business_registration_document_url: '/default-image.png'
  }
]

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    // 실제 API 호출은 주석 처리
    // const { data } = await fetchUserAuthorityRequests({
    //   status: filters.value.status,
    //   userId: filters.value.userId,
    //   page: page.value
    // })
    // requests.value = data.data
    // totalPages.value = data.totalPages || 1

    //  더미 데이터 사용
    const filtered = dummyData.filter(item => {
      const matchStatus = !filters.value.status || item.status === filters.value.status
      const matchUser = !filters.value.userId || item.ownerId.includes(filters.value.userId)
      return matchStatus && matchUser
    })
    requests.value = filtered
    totalPages.value = 1
  } catch (e) {
    error.value = '데이터를 불러오는 데 실패했습니다.'
    requests.value = []
  } finally {
    loading.value = false
  }
}

const openModal = (request) => {
  selectedRequest.value = request
  decision.value = ''
  rejectReason.value = ''
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleDecision = async () => {
  if (!decision.value) {
    alert('처리 상태를 선택해주세요.')
    return
  }
  if (decision.value === 'REJECTED' && !rejectReason.value.trim()) {
    alert('거절 사유를 입력해주세요.')
    return
  }

  try {
    // await updateUserAuthorityStatus(
    //     selectedRequest.value.ownerId,
    //     decision.value,
    //     rejectReason.value
    // )
    alert(`사용자 ${selectedRequest.value.ownerId} ${decision.value === 'ACCEPTED' ? '승인' : '거절'} 처리되었습니다.`)
    closeModal()
    fetchData()
  } catch (e) {
    alert('처리에 실패했습니다.')
  }
}

const onSearch = () => {
  page.value = 1
  fetchData()
}

onMounted(fetchData)
</script>


<template>
  <main>
    <!-- 필터 영역 -->
    <section aria-label="권한 요청 필터">
      <AdminFilter @search="onSearch" :title="pageTitle">
        <label class="filter-label">
          상태:
          <select v-model="filters.status" class="select-box">
            <option value="">전체</option>
            <option value="PENDING">대기</option>
            <option value="ACCEPTED">승인</option>
            <option value="REJECTED">거절</option>
          </select>
        </label>
        <label class="filter-label">
          사용자 ID:
          <input type="text" v-model="filters.userId" class="select-box id-input" placeholder="ID" />
        </label>
      </AdminFilter>
    </section>

    <!-- 데이터 상태 및 테이블 출력 -->
    <section aria-label="사업자 권한 요청 목록">
      <div v-if="loading">로딩 중...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="requests.length === 0">불러올 데이터가 없습니다.</div>

      <article v-else>
        <AdminTable>
          <template #thead>
            <tr>
              <th>사업자 ID</th>
              <th>이름</th>
              <th>상태</th>
              <th>사업자 등록증</th>
              <th>승인일자</th>
              <th>거절 사유</th>
            </tr>
          </template>
          <template #tbody>
            <tr v-for="req in requests" :key="req.ownerId">
              <td>{{ req.ownerId }}</td>
              <td>{{ req.userName }}</td>
              <td>
                {{
                  req.status === 'PENDING'
                      ? '대기'
                      : req.status === 'ACCEPTED'
                          ? '승인'
                          : req.status === 'REJECTED'
                              ? '거절'
                              : req.status
                }}
              </td>
              <td><a href="#" @click.prevent="openModal(req)">보기</a></td>
              <td>{{ req.authorizedAt || '-' }}</td>
              <td>{{ req.rejectionReason || '-' }}</td>
            </tr>
          </template>
        </AdminTable>

        <footer>
          <Pagination
              :current-page="page"
              :total-pages="totalPages"
              @update:page="(p) => { page.value = p; fetchData(); }" />
        </footer>
      </article>
    </section>

    <!-- 모달: 상세 보기 및 처리 -->
    <AdminModal v-model="isModalOpen">
      <template #title>
        <h2 class="modal-title">사업자 등록 요청 상세</h2>
      </template>

      <div class="modal-left">
        <img
            :src="selectedRequest?.business_registration_document_url || '/default-image.png'"
            alt="사업자 등록증"
            class="modal-image"
        />
      </div>

      <div class="modal-right">
        <p><strong>사업자 ID:</strong> {{ selectedRequest?.ownerId }}</p>
        <p><strong>이름:</strong> {{ selectedRequest?.userName }}</p>
        <p><strong>이메일:</strong> {{ selectedRequest?.email || '-' }}</p>

        <label class="modal-label">처리 상태:</label>
        <select v-model="decision" class="modal-select">
          <option value="">선택</option>
          <option value="ACCEPTED">승인</option>
          <option value="REJECTED">거절</option>
        </select>

        <label class="modal-label" v-if="decision === 'REJECTED'">거절 사유:</label>
        <input
            v-if="decision === 'REJECTED'"
            v-model="rejectReason"
            class="modal-input"
            placeholder="거절 사유 입력"
        />
      </div>

      <template #footer>
        <AdminButton type="approve" @click="handleDecision">처리</AdminButton>
        <AdminButton type="secondary" @click="closeModal">닫기</AdminButton>
      </template>
    </AdminModal>

  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminFilter from '@/features/admin/components/AdminFilter.vue'
import AdminTable from '@/features/admin/components/AdminTable.vue'
import Pagination from '@/features/admin/components/Pagination.vue'
// import { fetchPlaceReviewList } from '@/api/admin.js' // API 실제 연결 시 주석 해제
import '@/assets/css/admin-styles.css'
import AdminModal from "@/features/admin/components/AdminModal.vue";

const props = defineProps({ pageTitle: String })

const filters = ref({
  writerId: '',
  placeId: '',
  isActive: ''
})

const reviews = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    // 실제 API 요청 시 사용
    // const { data } = await fetchPlaceReviewList({
    //   ...filters.value,
    //   page: page.value
    // })
    // reviews.value = data.data
    // totalPages.value = data.totalPages || 1

    // 더미 데이터 삽입 위치
    reviews.value = [
      {
        reviewId: 101,
        writerId: 31,
        writerName: '풋살마스터',
        placeId: 24,
        placeName: '배드존 신대방',
        reviewScore: 5,
        reviewContent: '풋살장 넓고 공도 깨끗했어요. 다시 방문하고 싶어요.',
        reviewImageUrl: null,
        isActive: 'Y'
      },
      {
        reviewId: 102,
        writerId: 32,
        writerName: '볼링왕자',
        placeId: 27,
        placeName: '푸릇 볼링장',
        reviewScore: 4,
        reviewContent: '조금 좁긴 하지만 가격대비 만족했어요.',
        reviewImageUrl: 'https://cdn.pixabay.com/photo/2016/05/27/14/33/football-1419954_640.jpg',
        isActive: 'Y'
      }
    ]
    totalPages.value = 1
  } catch (e) {
    error.value = '후기 데이터를 불러오는 데 실패했습니다.'
    reviews.value = []
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
  page.value = 1
  fetchData()
}

const changePage = (p) => {
  page.value = p
  fetchData()
}

const isImageModalOpen = ref(false)
const imageUrl = ref('')

const openImageModal = (url) => {
  imageUrl.value = url
  isImageModalOpen.value = true
}

onMounted(fetchData)
</script>



<template>
  <main class="admin-main">
    <AdminFilter @search="onSearch" :title="pageTitle">
      <label class="filter-label">
        작성자 ID:
        <input type="text" v-model="filters.writerId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        장소 ID:
        <input type="text" v-model="filters.placeId" class="select-box id-input" placeholder="ID" />
      </label>
      <label class="filter-label">
        삭제 여부:
        <select v-model="filters.isActive" class="select-box">
          <option value="">전체</option>
          <option value="Y">공개</option>
          <option value="N">비공개</option>
        </select>
      </label>
    </AdminFilter>

    <section v-if="loading">로딩 중...</section>
    <section v-else-if="error">{{ error }}</section>
    <section v-else-if="reviews.length === 0">불러올 데이터가 없습니다.</section>

    <section v-else>
      <AdminTable>
        <template #thead>
          <tr>
            <th>후기 ID</th>
            <th>작성자 ID</th>
            <th>작성자</th>
            <th>장소 ID</th>
            <th>장소 이름</th>
            <th>평점</th>
            <th>후기 내용</th>
            <th>삭제 여부</th>
            <th>이미지</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="review in reviews" :key="review.reviewId">
            <td>{{ review.reviewId }}</td>
            <td>{{ review.writerId }}</td>
            <td>{{ review.writerName }}</td>
            <td>{{ review.placeId }}</td>
            <td>{{ review.placeName }}</td>
            <td>{{ review.reviewScore }}</td>
            <td class="review-text">{{ review.reviewContent }}</td>
            <td>{{ review.isActive === 'Y' ? '공개' : '비공개' }}</td>
            <td>
              <a v-if="review.reviewImageUrl" href="#" @click.prevent="openImageModal(review.reviewImageUrl)">보기</a>
              <span v-else>-</span>
            </td>
          </tr>
        </template>
      </AdminTable>

      <Pagination :current-page="page" :total-pages="totalPages" @update:page="changePage" />
    </section>

    <!-- 모달 -->
    <AdminModal v-model="isImageModalOpen">
      <template #title>
        <h2 class="modal-title">장소 후기 이미지</h2>
      </template>
      <img :src="imageUrl" alt="후기 이미지" style="max-width: 100%; border-radius: 8px;" />
    </AdminModal>
  </main>
</template>

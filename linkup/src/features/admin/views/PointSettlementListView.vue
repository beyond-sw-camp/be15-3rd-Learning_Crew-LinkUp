<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchSettlementList } from '@/api/admin.js'  // 실제 API 연동

// props
const props = defineProps({ pageTitle: String })

// 필터 상태 관리
const filters = ref({
  ownerId: '',
  startDate: '',
  endDate: ''
});

// 페이지 상태 관리
const page = ref(1); // 현재 페이지 번호
const rows = ref([]); // 데이터 저장
const totalPages = ref(1); // 전체 페이지 수

// 검색 버튼 클릭 시 호출되는 함수
const search = async () => {
  console.log('검색 버튼 클릭됨', filters.value); // 필터 값 확인 로그 추가
  page.value = 1; // 페이지 리셋
  await fetchList(); // 필터 값에 맞는 데이터 조회
};

// 사업자 정산 내역 조회 함수
const fetchList = async () => {
  try {
    const params = {
      ownerId: filters.value.ownerId || '',
      startDate: filters.value.startDate || '',
      endDate: filters.value.endDate || '',
      page: page.value || 1,
    };

    console.log('필터링된 파라미터:', params); // 필터 값 확인

    // API 호출
    const res = await fetchSettlementList(params);

    // 응답 데이터 구조 점검
    console.log('응답 데이터:', res); // 응답 데이터 확인

    // 응답 데이터 처리
    if (res.data && res.data.data && res.data.data.content) {
      rows.value = res.data.data.content; // 데이터 저장
      totalPages.value = res.data.data.totalPages || 1; // 전체 페이지 수 저장
      console.log('데이터 할당:', rows.value);  // rows 값 출력
    } else {
      console.error('잘못된 응답:', res);
      rows.value = [];
      totalPages.value = 1;
    }
  } catch (e) {
    console.error('API 요청 실패:', e);
    rows.value = [];
    totalPages.value = 1;
  }
};

// 컬럼 정의
const columns = [
  { key: 'settlementId', label: '정산 ID' },
  { key: 'ownerId', label: '사업자 ID' },
  { key: 'ownerName', label: '사업자 이름' },
  { key: 'amount', label: '정산 금액', format: v => `${v.toLocaleString()}원` },
  { key: 'settledAt', label: '정산 일시' }
];

</script>

<template>
  <AdminListTemplate
    :fetchFn="fetchList"
    :columns="columns"
    :initFilters="filters"
    :pageTitle="props.pageTitle"
    :enableModal="false"
    :currentPage="page"
  >
    <template #filters>
      <label class="filter-label">
        사업자 ID:
        <input v-model="filters.ownerId" class="select-box id-input" placeholder="사업자 ID" />
      </label>

      <label class="filter-label">
        정산 일시:
        <input type="date" v-model="filters.startDate" class="select-box date-input" />
        ~
        <input type="date" v-model="filters.endDate" class="select-box date-input" />
      </label>
    </template>
  </AdminListTemplate>
</template>

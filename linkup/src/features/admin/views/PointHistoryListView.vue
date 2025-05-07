<script setup>
import { ref } from 'vue'
import AdminListTemplate from '@/features/admin/components/AdminListTemplate.vue'
import { fetchPointTransactionList } from '@/api/admin.js'  // 실제 API 연동
import { format } from 'date-fns'

const pageTitle = '포인트 내역 조회';

// 필터 상태 관리
const filters = ref({
  userId: '',
  authority: '',
  transactionType: '',
  startDate: '',
  endDate: ''
});

const page = ref(1); // 페이지 상태 관리
const rows = ref([]); // 데이터 저장
const totalPages = ref(1); // 전체 페이지 수

// 검색 버튼 클릭 시 호출되는 함수
const search = async () => {
  console.log('검색 버튼 클릭됨', filters.value); // 필터 값 확인 로그 추가
  page.value = 1; // 페이지 리셋
  await fetchList(); // 필터 값에 맞는 데이터 조회
};

// 포인트 내역 조회 함수
// 포인트 내역 조회 함수
const fetchList = async ({ page = 1 }) => {
  try {
    const params = {
      userId: filters.value.userId || '',
      roleName: filters.value.authority || '',
      transactionType: filters.value.transactionType || '',
      startDate: filters.value.startDate || '',
      endDate: filters.value.endDate || '',
      page
    };

    // 빈 값 제거
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    });

    const res = await fetchPointTransactionList(params);
    console.log('응답 데이터:', res);

    return {
      data: res.data?.data?.content || [],
      totalPages: res.data?.data?.totalPages || 1
    };
  } catch (e) {
    console.error('API 요청 실패:', e);
    return { data: [], totalPages: 1 };
  }
};


// 테이블 컬럼 설정
const columns = [
  { key: 'pointTransactionId', label: 'ID' },
  { key: 'userId', label: '사용자 ID' },
  { key: 'userName', label: '사용자 이름' },
  { key: 'roleName', label: '권한' },
  {
    key: 'amount',
    label: '금액',
    format: v => (v != null ? `${v > 0 ? '+' : ''}${v.toLocaleString()}` : '-')
  },
  { key: 'transactionType', label: '유형' },
  {
    key: 'createdAt',
    label: '일시',
    format: v => v ? format(new Date(v), 'yyyy-MM-dd HH:mm') : '-'
  }
];
</script>

<template>
  <div>
    <AdminListTemplate
      :fetchFn="fetchList"
      :columns="columns"
      :initFilters="filters"
      :pageTitle="pageTitle"
      :enableModal="false"
    >

    <!-- 필터 영역 -->
      <template #filters="{ filters }">
        <!-- 사용자 ID 필터 -->
        <label class="filter-label" for="user-id-input">사용자 ID:</label>
        <input
          id="user-id-input"
          v-model="filters.userId"
          class="select-box id-input"
          placeholder="ID"
        />

        <!-- 권한 필터 -->
        <label class="filter-label" for="status-select">권한:</label>
        <select
          id="status-select"
          v-model="filters.authority"
          class="select-box"
        >
          <option value="">전체</option>
          <option value="MEMBER">회원</option>
          <option value="OWNER">사업자</option>
        </select>

        <!-- 트랜잭션 유형 필터 -->
        <label class="filter-label" for="transaction-type">트랜잭션 유형:</label>
        <select v-model="filters.transactionType" id="transaction-type" class="select-box">
          <option value="">전체</option>
          <option value="CHARGE">충전</option>
          <option value="PAYMENT">지불</option>
          <option value="REFUND">반환</option>
          <option value="WITHDRAW">환불</option>
        </select>

        <!-- 조회 기간 필터 -->
        <label class="filter-label">조회 기간:</label>
        <input type="date" v-model="filters.startDate" class="select-box date-input" />
        ~
        <input type="date" v-model="filters.endDate" class="select-box date-input" />
      </template>
    </AdminListTemplate>
    <!-- 테이블 데이터가 없을 경우 처리 -->
  </div>
</template>

<style scoped>
/* 여기에 스타일을 추가할 수 있습니다 */
</style>

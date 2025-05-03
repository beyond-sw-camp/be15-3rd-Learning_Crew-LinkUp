import api from './axios.js'

/* 1. 회원 목록 조회 (관리자)
     * @param {Object} params - 필터 및 페이지 정보
     * @param {string} [params.authority] - 권한 (USER | BUSINESS | ADMIN)
     * @param {string} [params.status] - 상태 (ACCEPTED | DELETED)
     * @param {number} [params.page] - 페이지 번호
     * @returns {Promise<Object>}
     */
export function fetchUserList(params) {
    return api.get('/admin/users', { params })
}

/* 2. 사업자 권한 요청 목록 조회 (관리자)
     * @param {Object} params - 필터 및 페이지 정보
     * @returns {Promise<Object>}
     */
export function fetchUserAuthorityRequests(params) {
    return api.get('/api/v1/common-service/admin/businesses/pending', { params })
}

/* 3. 사업자 권한 처리 (승인/거절)
     * @param {number} id - 사용자 ID
     * @param {string} decision - '승인' 또는 '거절'
     * @param {string} [reason] - 거절 사유 (거절 시 필수)
     * @returns {Promise<void>}
     */
export function updateUserAuthorityStatus(id, decision, reason = '') {
    if (decision === '승인') {
        return api.put(`/api/v1/common-service/admin/businesses/${id}/approve`)
    } else if (decision === '거절') {
        return api.put(`/api/v1/common-service/owners/reject`, {
            userId: id,
            reason: reason
        })
    } else {
        throw new Error('결정 값은 "승인" 또는 "거절"이어야 합니다.')
    }
}

/* 4. 게시글 목록 조회
     * @param {Object} params
     * @param {string} [params.writerId] - 작성자 ID
     * @param {string} [params.isDeleted] - 삭제 여부 ('Y' | 'N')
     * @param {number} [params.page] - 페이지 번호
     * @returns {Promise<Object>}
    */
export function fetchPostList(params) {
    return api.get('/api/v1/common-service/posts/list', { params })
}

/* 5. 댓글 내역 조회
     * @param {Object} params
     * @param {string} [params.userId] - 작성자 ID
     * @param {string} [params.isDeleted] - 삭제 여부 ('Y' | 'N')
     * @param {number} [params.page] - 페이지 번호
     * @returns {Promise<Object>}
     */
export function fetchCommentList(params) {
    return api.get('/api/v1/common-service/comments', { params })
}

/* 6. 포인트 내역 조회
     * @param {Object} params
     * @param {string} [params.userId] - 사용자 ID
     * @param {string} [params.authority] - 권한 (MEMBER | OWNER)
     * @param {string} [params.transactionType] - 유형 (CHARGE | PAYMENT | REFUND | WITHDRAW)
     * @param {string} [params.startDate] - 시작일 (YYYY-MM-DD)
     * @param {string} [params.endDate] - 종료일 (YYYY-MM-DD)
     * @param {number} [params.page] - 페이지 번호
     * @returns {Promise<Object>}
     */
export function fetchPointHistoryList(params) {
    return api.get('/api/v1/common-service/points', { params })
}

/* 7. 계좌 목록 조회 API
     * @param {Object} params
     * @param {string} [params.authority] - MEMBER | OWNER
     * @param {string} [params.status] - PENDING | APPROVED | REJECTED
     * @param {number} [params.page] - 페이지 번호
     * @returns {Promise<Object>} 응답 데이터
     */
export function fetchAccountList(params) {
    return api.get('/api/v1/common-service/accounts', { params })
}

/* 8. 관리자 - 모임 목록 조회 API
     * @param {Object} params - 필터 및 페이지 정보
     * @param {string} [params.gender] - 성별 ('M' | 'F' | 'BOTH')
     * @param {string} [params.ageGroup] - 나이대 ('20' | '30' 등)
     * @param {string} [params.level] - 레벨 ('LV1' | 'LV2' | 'LV3')
     * @param {string} [params.sportName] - 운동 종목명 ('테니스', '볼링' 등)
     * @param {string} [params.status] - 상태 ('PENDING' | 'ACCEPTED' | 'REJECTED' | 'DONE')
     * @param {string} [params.startDate] - 시작일자 (YYYY-MM-DD)
     * @param {string} [params.endDate] - 종료일자 (YYYY-MM-DD)
     * @param {number} [params.page=1] - 페이지 번호
     * @returns {Promise<Object>} 모임 목록 응답
     */
export function fetchMeetingList(params) {
    return api.get('/api/v1/common-service/admin/meetings', { params })
}

// 9. 운동 종목 목록 조회
export function fetchSportTypes() {
    return api.get('/api/v1/common-service/sports')
}

/* 10. 참가자 평가 내역 조회
     * @param {Object} params - 검색 조건
     * @param {'meetingId'|'writerId'|'revieweeId'} params.searchType - 검색 기준
     * @param {string} params.searchKeyword - 검색 키워드
     * @param {number} params.page - 현재 페이지
     * @returns {Promise} 참가자 평가 리스트 + 페이지 정보
     */
export const fetchParticipantReviewList = (params) => {
    return api.get('/admin/participant-reviews', { params })
}

/* 11. 장소 목록을 필터링 조건과 함께 조회합니다.
     * @param {Object} params - 필터 조건
     * @param {string} [params.sportId] - 운동 종목 ID
     * @param {string} [params.ownerId] - 사업자 ID
     * @param {string} [params.isActive] - 활성화 여부 ('Y' | 'N')
     * @param {number} [params.page] - 페이지 번호
     * @returns {Promise<{ data: { data: Array, totalPages: number } }>} 장소 목록 데이터
     */
export const fetchPlaceList = (params) => {
    return api.get('/admin/places', { params })
}

/* 12. 장소 후기 목록 조회 API
     * @param {Object} params - 필터링 및 페이징 파라미터
     * @param {string} [params.writerId] - 후기 작성자 ID (선택)
     * @param {string} [params.placeId] - 장소 ID (선택)
     * @param {string} [params.isActive] - 활성화 여부: 'Y' | 'N' | '' (선택)
     * @param {number} [params.page=1] - 페이지 번호 (기본값: 1)
     * @returns {Promise<Object>} 후기 목록과 페이징 정보
     */
export function fetchPlaceReviewList(params) {
    return api.get('/admin/place-reviews', { params })
}

// 신고 목록 조회 API
    // 관리자 페이지에서 신고 내역을 필터링 조건에 따라 조회합니다.
    // 필터 조건: 상태, 신고 유형, 페이지네이션
    // 반환 데이터: 신고 ID, 신고자/피신고자 정보, 신고 유형, 상태, 일시 등
export async function fetchReportList({ status = '', reportTypeId = '', page = 1 }) {
    return await api.get('/admin/reports', {
        params: {
            status,         // 예: '처리중', '완료', '기각'
            reportTypeId,   // 예: 1, 2, 3 등 (신고 유형 ID)
            page            // 현재 페이지 번호
        }
    })
}

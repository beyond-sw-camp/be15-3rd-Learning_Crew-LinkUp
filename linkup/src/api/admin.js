import api from './axios.js'

/* ------------------------------
 * 1. 회원 목록 조회 (관리자)
 * @param {Object} params - 필터 및 페이지 정보
 * @param {string} [params.authority] - 권한 (USER | BUSINESS | ADMIN)
 * @param {string} [params.status] - 상태 (ACCEPTED | DELETED)
 * @param {number} [params.page] - 페이지 번호
 * @returns {Promise<Object>}
 * ------------------------------ */
export function fetchUserList(params) {
    return api.get('/admin/users', { params })
}

/* ------------------------------
 * 2. 사업자 권한 요청 목록 조회 (관리자)
 * @param {Object} params - 필터 및 페이지 정보
 * @returns {Promise<Object>}
 * ------------------------------ */
export function fetchUserAuthorityRequests(params) {
    return api.get('/api/v1/common-service/admin/businesses/pending', { params })
}

/* ------------------------------
 * 3. 사업자 권한 처리 (승인/거절)
 * @param {number} id - 사용자 ID
 * @param {string} decision - '승인' 또는 '거절'
 * @param {string} [reason] - 거절 사유 (거절 시 필수)
 * @returns {Promise<void>}
 * ------------------------------ */
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

/* ------------------------------
 * 4. 게시글 목록 조회
 * @param {Object} params
 * @param {string} [params.writerId] - 작성자 ID
 * @param {string} [params.isDeleted] - 삭제 여부 ('Y' | 'N')
 * @param {number} [params.page] - 페이지 번호
 * @returns {Promise<Object>}
 * ------------------------------ */
export function fetchPostList(params) {
    return api.get('/api/v1/common-service/posts/list', { params })
}

/* ------------------------------
 * 5. 댓글 내역 조회
 * @param {Object} params
 * @param {string} [params.userId] - 작성자 ID
 * @param {string} [params.isDeleted] - 삭제 여부 ('Y' | 'N')
 * @param {number} [params.page] - 페이지 번호
 * @returns {Promise<Object>}
 * ------------------------------ */
export function fetchCommentList(params) {
    return api.get('/api/v1/common-service/comments', { params })
}

/* ------------------------------
 * 6. 포인트 내역 조회
 * @param {Object} params
 * @param {string} [params.userId] - 사용자 ID
 * @param {string} [params.authority] - 권한 (MEMBER | OWNER)
 * @param {string} [params.transactionType] - 유형 (CHARGE | PAYMENT | REFUND | WITHDRAW)
 * @param {string} [params.startDate] - 시작일 (YYYY-MM-DD)
 * @param {string} [params.endDate] - 종료일 (YYYY-MM-DD)
 * @param {number} [params.page] - 페이지 번호
 * @returns {Promise<Object>}
 * ------------------------------ */
export function fetchPointHistoryList(params) {
    return api.get('/api/v1/common-service/points', { params })
}

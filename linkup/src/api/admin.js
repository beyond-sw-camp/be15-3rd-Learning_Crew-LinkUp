import api from './axios.js'

/* 1. 관리자 - 회원 목록 조회
 * @param {Object} params - { authority: string, status: string, page: number } */
export function fetchUserList(params) {
    return api.get('/admin/users', { params })
}

/* 2. 관리자 - 사업자 권한 요청 목록 조회 */
export function fetchUserAuthorityRequests(params) {
    return api.get('/api/v1/common-service/admin/businesses/pending', { params })
}

export function updateUserAuthorityStatus(id, decision, reason = '') {
    if (decision === '승인') {
        // 사업자 권한 승인
        return api.put(`/api/v1/common-service/admin/businesses/${id}/approve`)
    } else if (decision === '거절') {
        // 사업자 권한 승인 거절
        return api.put(`/api/v1/common-service/owners/reject`, {
            userId: id,
            reason: reason
        })
    } else {
        throw new Error('결정 값은 "승인" 또는 "거절"이어야 합니다.')
    }
}

/* 3. 게시글 목록 조회 API
 * @param {Object} params - 필터 및 페이징 정보
 * @param {string} params.writerId - 작성자 ID (optional)
 * @param {string} params.isDeleted - 삭제 여부 ('Y' | 'N') (optional)
 * @param {number} params.page - 페이지 번호
 */
export function fetchPostList(params) {
    return api.get('/api/v1/common-service/posts/list', { params })
}

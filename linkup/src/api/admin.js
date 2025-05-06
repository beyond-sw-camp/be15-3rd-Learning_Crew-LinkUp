import api from './axios.js'

/* ------------------------------------ 회원 관리 ------------------------------------ */
export function fetchUserList(params) {
    return api.get('/admin/users', { params })
}

export function fetchUserAuthorityRequests(params) {
    return api.get('/api/v1/common-service/admin/businesses/pending', { params })
}

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

/* ------------------------------------ 게시글/댓글 ------------------------------------ */
export function fetchPostList(params) {
    return api.get('/api/v1/common-service/posts/list', { params })
}

export function fetchCommentList(params) {
    return api.get('/api/v1/common-service/comments', { params })
}

/* ------------------------------------ 포인트 관리 ------------------------------------ */
export function fetchPointHistoryList(params) {
    return api.get('/api/v1/common-service/points', { params })
}

export function fetchAccountList(params) {
    return api.get('/api/v1/common-service/accounts', { params })
}

/* ------------------------------------ 모임 관리 ------------------------------------ */
export function fetchMeetingList(params) {
    return api.get('/api/v1/common-service/admin/meetings', { params })
}

export function fetchSportTypes() {
    return api.get('/api/v1/common-service/sports')
}

export const fetchParticipantReviewList = (params) => {
    return api.get('/admin/participant-reviews', { params })
}

/* ------------------------------------ 장소 관리 ------------------------------------ */
export const fetchPlaceList = (params) => {
    return api.get('/admin/places', { params })
}

export function fetchPlaceReviewList(params) {
    return api.get('/admin/place-reviews', { params })
}

/* ----------------------------- 신고 관련 API ----------------------------- */
/**
 * 신고 목록 조회
 * @param {Object} params
 * @param {number} [params.statusId] - 처리 상태 ID (예: 1: 처리중, 2: 완료, 3: 기각)
 * @param {number} [params.reportTypeId] - 신고 유형 ID
 * @param {number} [params.page] - 페이지 번호
 * @returns {Promise<Object>} 신고 목록과 페이징 정보
 */
export function fetchReportList({ statusId = null, reportTypeId = null, page = 1 }) {
    return api.get('/common-service/report', {
        params: {
            statusId,
            reportTypeId,
            page
        }
    })
}

/**
 * 신고 상세 정보 조회
 * @param {number|string} reportId
 * @returns {Promise<Object>} 신고 상세 정보
 */
export function fetchReportDetail(reportId) {
    return api.get(`/common-service/report/${reportId}`)
}

/**
 * 신고 유형 목록 조회
 * @returns {Promise<Array>} 신고 유형 배열
 */
export function fetchReportTypes() {
    return api.get('/common-service/report/types')
}

/**
 * 허위 신고 처리 (statusId: 3)
 * @param {number|string} reportId
 * @param {string} message - 처리 메시지
 * @returns {Promise<void>}
 */
export function rejectReport(reportId, message = '허위 신고로 처리되었습니다.') {
    return api.put(`/common-service/report/${reportId}/rejected`, {
        reportId,
        statusId: 3,
        message
    })
}

/**
 * 정상 신고 처리 및 제재 등록 (statusId: 2)
 * @param {number|string} reportId
 * @param {string} message - 처리 메시지
 * @returns {Promise<void>}
 */
export function acceptReport(reportId, message = '신고가 처리되고 제재가 등록되었습니다.') {
    return api.put(`/common-service/report/${reportId}/accepted`, {
      reportId,
      statusId: 2,
      message,
    });
}

/**
 * 신고 대상 목록 조회 (피신고자 목록)
 * @param {Object} params
 * @param {string} [params.isActive] - 'Y' | 'N'
 * @param {string} [params.searchType] - 'userId' | 'postId' | 'commentId'
 * @param {string} [params.searchKeyword]
 * @param {number} [params.page]
 * @returns {Promise<Object>}
 */
export function fetchReportedTargetList(params) {
    return api.get('/common-service/report/reportee-user', { params })
}

/**
 * 특정 신고 대상 상세 정보 + 이력 조회
 * @param {'USER'|'POST'|'COMMENT'} targetType
 * @param {string|number} targetId
 * @returns {Promise<Object>}
 */
export function fetchTargetDetailById(targetType, targetId) {
    return api.get(`/common-service/report/reportee-user/${targetId}`)
}


/* ------------------------------------ 제재 관리 ------------------------------------ */
export function fetchPenaltyList(params) {
    return api.get('/admin/penalties', { params })
}

export function fetchPenaltyDetail(penaltyId) {
    return api.get(`/api/v1/common-service/penalty/${penaltyId}`)
}

export function confirmReviewPenalty(reviewId) {
    return api.post(`/api/v1/common-service/penalty/placeReview/${reviewId}/done`, {
        reviewId
    })
}

/* ------------------------------------ 이의 제기 ------------------------------------ */
export function fetchObjectionList(params) {
    return api.get('/admin/objections', { params })
}

export function fetchObjectionDetail(objectionId) {
    return api.get(`/admin/objections/${objectionId}`)
}

export function acceptObjection(objectionId) {
    return api.post(`/api/v1/common-service/objections/${objectionId}/accept`, {
        objectionId
    })
}

export function rejectObjection(objectionId) {
    return api.post(`/api/v1/common-service/objections/${objectionId}/reject`, {
        objectionId
    })
}

/* ------------------------------------ 블랙리스트 ------------------------------------ */
export function fetchBlacklistList(params) {
    return api.get('/admin/blacklist', { params })
}

export function fetchBlacklistDetail(memberId) {
    return api.get(`/api/v1/common-service/blacklist/${memberId}`)
}

export function clearBlacklist(memberId) {
    return api.post(`/api/v1/common-service/blacklist/${memberId}/clear`)
}
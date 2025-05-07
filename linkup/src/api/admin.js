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
/**
 * 관리자 - 모임 목록 조회
 * @param {Object} params - 필터 및 페이지 정보
 * @param {string} [params.gender] - 성별 ('M' | 'F' | 'BOTH')
 * @param {string} [params.ageGroup] - 나이대 ('20', '30', '20,30' 등)
 * @param {string} [params.level] - 레벨 ('LV1' | 'LV2' | 'LV3')
 * @param {string} [params.sportName] - 운동 종목명 ('테니스', '볼링' 등)
 * @param {string} [params.status] - 상태 ('PENDING' | 'ACCEPTED' | 'REJECTED' | 'DONE')
 * @param {string} [params.startDate] - 시작일자 (YYYY-MM-DD)
 * @param {string} [params.endDate] - 종료일자 (YYYY-MM-DD)
 * @param {number} [params.page=1] - 페이지 번호
 * @returns {Promise<Object>} 모임 목록 응답
 */
export function fetchAdminMeetingList(params) {
    return api.get('/api/v1/common-service/meetings/list', { params })
}

/**
 * 모임 상세 조회
 * @param {number|string} meetingId
 * @returns {Promise<Object>} 단일 모임 상세 정보
 */
export function fetchMeetingDetail(meetingId) {
    return api.get(`/api/v1/common-service/meetings/${meetingId}`)
}

/**
 * 관리자 - 참가자 평가 내역 조회
 * @param {Object} params
 * @param {'meetingId'|'reviewerId'|'revieweeId'} params.searchType - 검색 기준
 * @param {string} params.searchKeyword - 검색어
 * @param {number} params.page - 페이지 번호
 * @returns {Promise<Object>} 평가 내역 + pagination
 */
export function fetchParticipantReviewList(params) {
    return api.get('/api/v1/common-service/meetings/review', { params })
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
 * 전체 신고 내역 조회
 * @param {Object} params
 * @param {number|string} [params.reporterMemberId]
 * @param {number|string} [params.targetMemberId]
 * @param {number|string} [params.reportTypeId]
 * @param {number|string} [params.statusId]
 * @param {number} [params.page]
 * @returns {Promise<Object>} 신고 목록 및 페이징 정보
 */
export function fetchReportList({
                                    reporterMemberId = null,
                                    targetMemberId = null,
                                    reportTypeId = null,
                                    statusId = null,
                                    page = 1
                                }) {
    return api.get('/common-service/report', {
        params: {
            reporterMemberId, targetMemberId, reportTypeId, statusId, page
        }
    })
}


/**
 * 신고 상세 정보 조회
 * @param {number|string} reportId
 * @returns {Promise<Object>} 단일 신고 상세 정보
 */
export function fetchReportDetail(reportId) {
    return api.get(`/common-service/report/${reportId}`)
}

/**
 * 신고 종류 목록 조회
 * @returns {Promise<Object>} 신고 유형 배열 (id, name)
 */
export function fetchReportTypes() {
    return api.get('/common-service/report/types')
}

/**
 * 허위 신고 처리 (statusId = 3)
 * @param {number|string} reportId
 * @param {string} [message] - 기본 메시지 제공
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
 * 정상 신고 처리 및 제재 등록 (statusId = 2)
 * @param {number|string} reportId
 * @param {string} [message] - 기본 메시지 제공
 * @returns {Promise<void>}
 */
export function acceptReport(reportId, message = '신고가 처리되고 제재가 등록되었습니다.') {
    return api.put(`/common-service/report/${reportId}/accepted`, {
        reportId,
        statusId: 2,
        message
    })
}

/**
 * 신고 대상별 목록 조회
 * @param {Object} params
 * @param {string} params.targetType - 필수 (null 가능)
 * @param {string|number|null} [params.targetId] - optional
 * @param {string|null} [params.isActive] - Y | N | null
 * @param {number} [params.page]
 */
export function fetchReportedTargetList({ targetType = null, targetId = null, isActive = null,
                                            page = 1
                                        }) {
    return api.get('/common-service/report/target', {
        params: {
            targetType, targetId, isActive, page
        }
    })
}

/**
 * 특정 신고 대상 상세 조회
 * @param {'USER'|'POST'|'COMMENT'} targetType
 * @param {number|string} targetId
 * @returns {Promise<Object>} 상세 정보 + reportList
 */
export function fetchTargetDetailById(targetType, targetId) {
    return api.get(`/common-service/report/target/${targetType}/${targetId}`)
}

/**
 * 신고자 목록 조회 (누적 신고 기준)
 * @param {Object} params
 * @param {string|number} [params.reporterId]
 * @param {number} [params.page]
 * @returns {Promise<Object>} 신고자 목록 + pagination
 */
export function fetchReporterUserList({ reporterId = null, page = 1 }) {
    return api.get('/common-service/report/reporter-user', {
        params: { reporterId, page }
    })
}

/**
 * 신고자별 신고 이력 상세 조회
 * @param {number|string} reporterId
 * @returns {Promise<Object>} 신고 리스트 포함 상세 정보
 */
export function fetchReporterUserDetail(reporterId) {
    return api.get(`/common-service/report/reporter-user/${reporterId}`)
}

/**
 * 피신고자 목록 조회 (누적 점수 기준)
 * @param {Object} params
 * @param {string|number} [params.reporteeId]
 * @param {number} [params.page]
 */
export function fetchReporteeUserList({ reporteeId = null, page = 1 }) {
    return api.get('/common-service/report/reportee-user', {
        params: { reporteeId, page }
    })
}

/**
 * 피신고자 상세 신고 이력 조회
 * @param {number|string} reporteeId
 */
export function fetchReporteeUserDetail(reporteeId) {
    return api.get(`/common-service/report/reportee-user/${reporteeId}`)
}

// 신고 API
export function reportUser(payload) {
    return api.post('/common-service/report/user', payload)
}

export function reportPost(payload) {
    return api.post('/common-service/report/post', payload)
}

export function reportComment(payload) {
    return api.post('/common-service/report/comment', payload)
}



/* ----------------------------- 제재 관련 API ----------------------------- */

/**
 * 제재 내역 목록 조회
 * @param {Object} params
 * @param {number|string} [params.userId]
 * @param {string} [params.penaltyType] - POST | COMMENT | REVIEW
 * @param {number|string} [params.statusId]
 * @param {number} [params.page]
 */
export function fetchPenaltyList({ userId, penaltyType, statusId, page = 1 }) {
    return api.get('/common-service/penalty', {
        params: {
            userId: userId || undefined,
            penaltyType: penaltyType || undefined,
            statusId: statusId || undefined,
            page
        }
    })
}

/**
 * 제재 상세 조회
 * @param {number|string} penaltyId
 * @returns {Promise<Object>}
 */
export function fetchPenaltyDetail(penaltyId) {
    return api.get(`/common-service/penalty/${penaltyId}`)
}

/**
 * 게시글 제재 등록
 * @param {number|string} postId
 * @param {string} reason
 * @returns {Promise<Object>}
 */
export function penalizePost(postId, reason) {
    return api.put(`/common-service/penalty/post/${postId}`, { reason })
}

/**
 * 댓글 제재 등록
 * @param {number|string} commentId
 * @param {string} reason
 * @returns {Promise<Object>}
 */
export function penalizeComment(commentId, reason) {
    return api.put(`/common-service/penalty/comment/${commentId}`, { reason })
}

/**
 * 장소 후기 제재 요청
 * @param {number|string} reviewId
 * @param {string} reason
 * @returns {Promise<Object>}
 */
export function penalizePlaceReview(reviewId, reason) {
    return api.put(`/common-service/penalty/placeReview/${reviewId}`, { reason })
}

/**
 * 장소 후기 제재 확정 (REVIEW + PENDING 상태에서만)
 * @param {number|string} reviewId
 * @returns {Promise<Object>}
 */
export function confirmReviewPenalty(reviewId) {
    return api.put(`/common-service/penalty/placeReview/${reviewId}/done`)
}

/**
 * 제재 철회
 * @param {number|string} penaltyId
 * @returns {Promise<Object>}
 */
export function withdrawPenalty(penaltyId) {
    return api.put(`/common-service/penalty/${penaltyId}`)
}


/* ------------------------------------ 이의 제기 ------------------------------------ */
/**
 * 이의 제기 목록 조회 (관리자용)
 * @param {Object} params - 조회 조건
 * @param {string} params.memberId - 사용자 ID (옵션)
 * @param {string} params.statusId - 처리 상태 (옵션: 1=대기, 2=승인, 3=거절)
 * @param {number} params.page - 페이지 번호
 * @returns {Promise<Object>} - objections 배열과 pagination 정보
 */
export function fetchObjectionList({ memberId = '', statusId = '', page = 1 }) {
    return api.get('/common-service/objections', {
        params: { memberId, statusId, page }
    })
}

/**
 * 이의 제기 상세 조회 (관리자용)
 * @param {number|string} objectionId - 이의 제기 ID
 * @returns {Promise<Object>} - objection 상세 정보
 */
export function fetchObjectionDetail(objectionId) {
    return api.get(`/common-service/objections/${objectionId}`)
}

/**
 * 장소 후기 제재에 대한 이의 신청
 * @param {number|string} reviewId
 * @param {Object} payload - { memberId, reason }
 * @returns {Promise<Object>}
 */
export function objectToPlaceReview(reviewId, payload) {
    return api.post(`/common-service/objections/review/${reviewId}`, payload)
}

/**
 * 게시글 제재에 대한 이의 신청
 * @param {number|string} postId
 * @param {Object} payload - { memberId, reason }
 * @returns {Promise<Object>}
 */
export function objectToPost(postId, payload) {
    return api.post(`/common-service/objections/post/${postId}`, payload)
}

/**
 * 댓글 제재에 대한 이의 신청
 * @param {number|string} commentId
 * @param {Object} payload - { memberId, reason }
 * @returns {Promise<Object>}
 */
export function objectToComment(commentId, payload) {
    return api.post(`/common-service/objections/comment/${commentId}`, payload)
}


/**
 * 이의 제기 승인 (관리자용)
 * @param {number|string} objectionId - 이의 제기 ID
 * @returns {Promise<Object>} - 처리 결과 메시지 포함
 */
export function acceptObjection(objectionId) {
    return api.put(`/common-service/objections/${objectionId}/accept`)
}

/**
 * 이의 제기 거절 (관리자용)
 * @param {number|string} objectionId - 이의 제기 ID
 * @returns {Promise<Object>} - 처리 결과 메시지 포함
 */
export function rejectObjection(objectionId) {
    return api.put(`/common-service/objections/${objectionId}/reject`)
}

/* ------------------------------------ 블랙리스트 ------------------------------------ */
/**
 * 블랙리스트 목록 조회
 * @param {Object} params
 * @param {string|number} [params.memberId] - 사용자 ID (필터용)
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @returns {Promise<Object>} 블랙리스트 사용자 목록과 페이징 정보
 */
export function fetchBlacklist({ memberId = null, page = 1 }) {
    return api.get('/common-service/blacklist', {
        params: { memberId, page }
    })
}

/**
 * 블랙리스트 상세 정보 조회
 * @param {number|string} memberId - 조회할 사용자 ID
 * @returns {Promise<Object>} 사용자 블랙리스트 상세 정보
 */
export function fetchBlacklistDetail(memberId) {
    return api.get(`/common-service/blacklist/${memberId}`)
}

/**
 * 블랙리스트 등록
 * @param {number|string} memberId - 등록 대상 사용자 ID
 * @param {string} reason - 등록 사유
 * @returns {Promise<Object>} 등록 결과 메시지
 */
export function registerBlacklist(memberId, reason) {
    return api.post(`/common-service/blacklist/${memberId}`, {
        memberId,
        reason
    })
}

/**
 * 블랙리스트 해제
 * @param {number|string} memberId - 해제할 사용자 ID
 * @returns {Promise<Object>} 해제 결과 메시지
 */
export function unblockBlacklist(memberId) {
    return api.delete(`/common-service/blacklist/${memberId}/clear`)
}
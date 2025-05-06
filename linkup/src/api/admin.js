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

/* ------------------------------------ 신고 관리 ------------------------------------ */
export function fetchReportList({ status = '', reportTypeId = '', page = 1 }) {
    return api.get('/admin/reports', {
        params: { status, reportTypeId, page }
    })
}

export function fetchReportedTargetList(params) {
    return api.get('/admin/reports/targets', { params })
}

export function fetchTargetDetailById(targetType, targetId) {
    return api.get(`/admin/reports/targets/${targetType}/${targetId}`)
}

export function fetchReportDetail(reportId) {
    return api.get(`/admin/reports/${reportId}`)
}

// 신고 처리: 허위 신고 처리
export function rejectReport(reportId, message) {
    return api.post(`/api/v1/common-service/report/${reportId}/rejected`, {
        reportId,
        statusId: 3,
        message
    })
}

// 신고 처리: 제재 확정 처리
export function acceptReport(reportId, message) {
    return api.post(`/api/v1/common-service/report/${reportId}/accepted`, {
        reportId,
        statusId: 2,
        message
    })
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
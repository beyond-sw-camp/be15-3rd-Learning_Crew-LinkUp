import api from './axios.js'

/* ------------------------------------ 회원 관리 ------------------------------------ */
/**
 * 전체 회원 목록을 조회하는 API
 * @param {Object} params - 요청 파라미터
 * @param {string} [params.roleName] - 필터링할 역할 이름 (optional)
 * @param {string} [params.statusName] - 필터링할 상태 이름 (optional)
 * @param {number} [params.page=1] - 조회할 페이지 번호 (default: 1)
 * @param {number} [params.size=10] - 페이지당 아이템 개수 (default: 10)
 * @returns {Promise<Object>} - 전체 회원 목록 및 페이징 정보
 */
export function fetchUserList({ roleName = '', statusName = '', page = 1, size = 10 }) {
  // 필터링된 파라미터만 전달
  const params = {
    ...(roleName && { roleName }),   // roleName이 있을 경우에만 포함
    ...(statusName && { statusName }), // statusName이 있을 경우에만 포함
    page,
    size
  };

  return api.get('/user-service/admin/users', { params });
}

/**
 * 모든 사업자 목록을 조회하는 API
 * @param {Object} params - 요청 파라미터
 * @param {string} [params.statusName] - 필터링할 상태 이름 (optional)
 * @param {number} [params.page=1] - 조회할 페이지 번호 (default: 1)
 * @param {number} [params.size=10] - 페이지당 아이템 개수 (default: 10)
 * @returns {Promise<Object>} - 모든 사업자 목록 및 페이징 정보
 */
export function fetchAllOwners({ statusName = '', page = 1, size = 10 }) {
  // 필터링된 파라미터만 전달
  const params = {
    ...(statusName && { statusName }),  // statusName이 있을 경우에만 포함
    page,
    size
  };

  return api.get('/common-service/admin/businesses', { params });
}

/**
 * 사업자 상세 정보 조회 API
 * @param {number} targetId - 사업자 ID
 * @returns {Promise<Object>} - 사업자 상세 정보
 */
export function fetchOwnerDetails(targetId) {
  return api.get(`/businesses/${targetId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('사업자 상세 조회 실패:', error);
      throw error; // Propagate error for further handling
    });
}


/* ------------------------------------ 게시글/댓글 ------------------------------------ */
/**
 * 전체 게시글 목록 조회 (관리자용, 검색 조건 포함)
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {string} [params.keyword] - 게시글 제목 또는 내용으로 키워드 검색
 * @param {string} [params.isDeleted] - 삭제 여부 필터 (Y = 삭제, N = 미삭제)
 * @returns {Promise<Object>} 게시글 목록 및 페이징 정보
 */
export function fetchAllPosts({
                                page = 1, size = 10,
                                keyword = '', isDeleted = ''
                              }) {
  return api.get('/common-service/posts/list', {
    params: {
      page, size, keyword, isDeleted
    }
  })
}


/**
 * 전체 댓글 조회 (관리자용)
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {number} [params.userId] - 특정 회원 ID로 댓글 조회
 * @param {string} [params.keyword] - 댓글 내용 또는 제목 키워드로 검색
 * @param {string} [params.isDeleted] - 삭제 여부 필터 (Y = 삭제, N = 미삭제)
 * @returns {Promise<Object>} 댓글 목록 및 페이징 정보
 */
export function fetchAllComments({
                                   page = 1, size = 10,
                                   userId = null, keyword = '', isDeleted = ''
                                 }) {
  return api.get('/common-service/comments', {
    params: {
      page, size, userId, keyword, isDeleted
    }
  })
}


/* ------------------------------------ 포인트 관리 ------------------------------------ */
/**
 * 포인트 트랜잭션 내역 조회
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {number} [params.userId] - 사용자 ID
 * @param {string} [params.roleName] - 권한 이름 (ex: USER, ADMIN, BUSINESS)
 * @param {string} [params.transactionType] - 거래 유형 (ex: CHARGE, PAYMENT, REFUND, WITHDRAW)
 * @param {string} [params.startDate] - 조회 시작일 (YYYY-MM-DD)
 * @param {string} [params.endDate] - 조회 종료일 (YYYY-MM-DD)
 * @returns {Promise<Object>} 포인트 트랜잭션 내역 목록 및 페이징 정보
 */
export function fetchPointTransactionList({
                                            page = 1, size = 10,
                                            userId = null, roleName = null,
                                            transactionType = null, startDate = null, endDate = null
                                          }) {
  const params = {
    page, size, userId, roleName, transactionType, startDate, endDate
  };

  // null, undefined, 빈 문자열을 제외한 파라미터만 포함시키기
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined || params[key] === '') {
      delete params[key];
    }
  });

  return api.get('/common-service/admin/users/point/transaction', {
    params
  });
}

/**
 * 사업자 정산 내역 목록 조회
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {number} [params.userId] - 사업자 ID
 * @param {string} [params.startDate] - 조회 시작일 (YYYY-MM-DD)
 * @param {string} [params.endDate] - 조회 종료일 (YYYY-MM-DD)
 * @returns {Promise<Object>} 사업자 정산 내역 목록 및 페이징 정보
 */
export function fetchSettlementList({
                                      page = 1, size = 10, userId = null, startDate = null, endDate = null
                                    }) {
  const params = {
    page,
    size,
    userId: userId ? Number(userId) : null,
    startDate: /^\d{4}-\d{2}-\d{2}$/.test(startDate) ? startDate : null,
    endDate: /^\d{4}-\d{2}-\d{2}$/.test(endDate) ? endDate : null
  };

  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined || params[key] === '') {
      delete params[key];
    }
  });

  return api.get('/common-service/settlements/users', {
    params
  });
}


/**
 * 계좌 목록 조회
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {string} [params.XUserRole] - 권한 이름 (ex: USER, ADMIN, BUSINESS)
 * @param {string} [params.statusType] - 상태 타입 (ex: PENDING, ACCEPTED, DELETED, REJECTED)
 * @returns {Promise<Object>} 계좌 목록 및 페이징 정보
 */
export function fetchAccount({
                               page = 1, size = 10, XUserRole = null, statusType = null
                             }) {
  const params = {
    page, size, XUserRole, statusType
  };

  // null, undefined, 빈 문자열을 제외한 파라미터만 포함시키기
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined || params[key] === '') {
      delete params[key];
    }
  });

  return api.get('/common-service/users/accounts', {
    params
  });
}




/* ------------------------------------ 모임 관리 ------------------------------------ */
/**
 * 전체 모임 내역 조회
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {string} [params.gender] - 성별 필터 (BOTH, FEMALE, MALE)
 * @param {Array<string>} [params.ageGroups] - 나이대 필터 (예: ["10", "20", "30", "40", "50", "60", "70+"])
 * @param {Array<string>} [params.levels] - 레벨 필터 (예: ["LV1", "LV2", "LV3"])
 * @param {Array<number>} [params.sportIds] - 스포츠 ID 필터 (예: [1, 2, 3])
 * @param {Array<number>} [params.statusIds] - 상태 ID 필터 (예: [1, 2, 3, 4, 5])
 * @param {string} [params.minDate] - 최소 날짜 필터 (형식: yyyy-MM-dd)
 * @param {string} [params.maxDate] - 최대 날짜 필터 (형식: yyyy-MM-dd)
 * @returns {Promise<Object>} 전체 모임 목록 및 페이징 정보
 */
export function fetchMeetingList({
                                     page = 1,
                                     size = 10,
                                     gender = 'BOTH',
                                     ageGroups = ["10", "20", "30", "40", "50", "60", "70+"],
                                     levels = ["LV1", "LV2", "LV3"],
                                     sportIds = [1, 2, 3, 4, 5, 6, 7, 8],
                                     statusIds = [1, 2, 3, 4, 5],
                                     minDate = null,
                                     maxDate = null
                                 }) {
    return api.get('/common-service/meetings/list', {
        params: {
            page, size,
            gender,
            ageGroups: ageGroups.join(','),
            levels: levels.join(','),
            sportIds: sportIds.join(','),
            statusIds: statusIds.join(','),
            minDate, maxDate
        }
    })
}

/**
 * 참가자 평가 내역 조회
 * @param {Object} params
 * @param {number} [params.page] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size] - 페이지 크기 (기본값: 10)
 * @param {number} [params.meetingId] - 모임 ID
 * @param {number} [params.reviewerId] - 평가자 ID
 * @param {number} [params.revieweeId] - 평가받은 사람 ID
 * @returns {Promise<Object>} 참가자 평가 목록 및 페이징 정보
 */
export function fetchParticipantReviews({
                                            page = 1,
                                            size = 10,
                                            meetingId = null,
                                            reviewerId = null,
                                            revieweeId = null
                                        }) {
    return api.get('/common-service/meetings/review', {
        params: {
            page, size, meetingId, reviewerId, revieweeId
        }
    })
}





/* ------------------------------------ 장소 관리 ------------------------------------ */
/**
 * 관리자가 서비스에 등록된 장소 목록을 조회합니다.
 * @param {Object} params
 * @param {number} [params.page=1] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size=10] - 페이지 크기 (기본값: 10)
 * @param {number} [params.sportId] - 운동 종목 ID (선택사항)
 * @param {string} [params.address] - 장소 주소 (선택사항)
 * @param {number} [params.ownerId] - 장소 소유자 ID (선택사항)
 * @param {boolean} [params.isActive] - 활성/비활성 필터 (선택사항)
 * @returns {Promise<Object>} 장소 목록 및 페이징 정보
 */
export function fetchPlaceList({
                                   page = 1, size = 10,
                                   sportId = null,
                                   address = null,
                                   ownerId = null,
                                   isActive = null
                               }) {
    return api.get('/common-service/admin/places', {
        params: {
            page, size, sportId, address, ownerId, isActive
        }
    })
}

/**
 * 관리자가 등록된 장소에 대한 후기 내역을 조회합니다.
 * @param {Object} params
 * @param {number} [params.page=1] - 페이지 번호 (기본값: 1)
 * @param {number} [params.size=10] - 페이지 크기 (기본값: 10)
 * @param {number} [params.memberId] - 회원 ID (선택사항)
 * @param {boolean} [params.isActive] - 활성/비활성 필터 (선택사항)
 * @returns {Promise<Object>} 장소 후기 목록 및 페이징 정보
 */
export function fetchPlaceReviewList({
                                         page = 1, size = 10,
                                         memberId = null, isActive = null
                                     }) {
    return api.get('/common-service/admin/place-reviews', {
        params: {
            page, size, memberId, isActive
        }
    })
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
 * @param {number} targetId
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
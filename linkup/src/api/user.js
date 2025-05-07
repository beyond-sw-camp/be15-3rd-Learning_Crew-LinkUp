/* user 관련 api 호출 */
import api from './axios.js';

/**
 * @typedef {Object} TokenResponse
 * @property {string} accessToken - 발급된 액세스 토큰 (Bearer Token)
 * @property {string} refreshToken - 발급된 리프레시 토큰 (HttpOnly 쿠키로도 전달될 수 있음)
 * @property {string} nickname - 회원명
 * @property {string} profileImageUrl - 프로필 이미지
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - 요청 성공 여부
 * @property {T} data - 응답 데이터 (제네릭 타입)
 * @property {string} message - 응답 메시지
 */

/* 1. 회원 가입 */
export function registerUser(data) {
  return api.post('/user-service/users/register', data);
}

/* 2. 로그인 */
/**
 * @typedef {Object} LoginRequest
 * @property {string} email - 사용자 이메일 (ID)
 * @property {string} password - 사용자 비밀번호
 */

/**
 * 로그인 요청
 * @param {LoginRequest} data - 로그인 요청 데이터
 * @returns {Promise<ApiResponse<TokenResponse>>} 서버 응답 (액세스 토큰, 리프레시 토큰 포함)
 */
export function loginUser(data) {
  return api.post('/user-service/auth/login', data);
}

/* 3. 로그아웃 */
export function logoutUser() {
  return api.post('/user-service/auth/logout');
}

/* 4. 리프레시 토큰으로 토큰 재발급 */
export function refreshUserToken() {
  return api.post(`/user-service/auth/refresh`);
}

/* 5. 유저 목록 조회 */
export function getUsers() {
  return api.get('/user-service/admin/users');
}

/* 6. 내 정보 조회 */
export function getUserDetail() {
  return api.get('/user-service/users/me');
}

/* 7. 회원 마이페이지 조회 */
export function getUserMypage() {
  return api.get('/user-service/users/me/mypage');
}

/* 8. 사업자 마이페이지 조회 */
export function getBusinessMypage() {
  return api.get('/user-service/users/me/mypage/business');
}

/* 9. 포인트 조회 */
export function getUserPointTransactions(params) {
  return api.get('/common-service/user/point/transaction', { params: params });
}

/* 10. 비밀번호 재설정 링크 전송 */
export function postResetPassword(data) {
  return api.post('/user-service/auth/password/reset-link', data);
}

/* 11. 비밀번호 재설정 */
export function postResetPasswordConfirm(data) {
  return api.post('/user-service/auth/password/reset', data);
}

/* 12. 계정 복구 신청 */
export function postRecoverAccount(data) {
  return api.post('/user-service/users/recover', data);
}

/**
 * [모임 이력 조회 API]
 * @param {Object} params - 조회 조건
 * @param {string|null} params.status - 모임 상태 (COMPLETED, CANCELLED, UPCOMING)
 * @param {number} params.page - 페이지 번호 (0부터 시작)
 * @param {number} params.size - 페이지 크기
 * @returns {Promise<ApiResponse<PageResponse<MeetingHistoryResponse>>>}
 */
export function getUserMeetingHistory({ status, page, size }) {
  return api.get('/common-service/user/meetings/history', {
    params: { status, page, size },
  });
}


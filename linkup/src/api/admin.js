import api from './axios.js'

/* 1. 관리자 - 회원 목록 조회
 * @param {Object} params - { authority: string, status: string, page: number } */
export function fetchUserList(params) {
    return api.get('/admin/users', { params })
}

// 예: 게시글 내역 조회
// export function fetchUserPosts(params) {
//   return api.get('/admin/posts', { params })
// }

// 예: 제재 목록 조회
// export function fetchPenalties(params) {
//   return api.get('/admin/penalties', { params })
// }

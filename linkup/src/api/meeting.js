import api from './axios.js'

//  모임 목록 조회 API 임시 구현
export const fetchMeetingList = async (params) => {
  try {
    const response = await api.get('/api/meetings', { params })
    return response
  } catch (error) {
    console.error('모임 목록 조회 실패:', error)
    return { data: [] } // 실패 시 빈 배열 반환
  }
}
// src/api/utils/favorite.js
import api from './axios';

/**
 * 즐겨찾기 등록
 * POST /common-service/places/{placeId}
 * Body: { memberId: number }
 */
export const createFavorite = (placeId, memberId) => {
  return api.post(`/common-service/places/${placeId}`, { memberId });
};

/**
 * 즐겨찾기 삭제
 * DELETE /common-service/places/{placeId}?memberId=xx
 */
export const deleteFavorite = (placeId, memberId) => {
  return api.delete(`/common-service/places/${placeId}`, {
    params: { memberId }
  });
};

/**
 * 즐겨찾기한 장소 목록 조회
 * GET /common-service/user/{memberId}/favorite
 */
export const getFavoritePlaceIds = async (memberId) => {
  try {
    const res = await api.get(`/common-service/user/${memberId}/favorite`);
    return res.data.data.favorites || [];
  } catch (err) {
    if (err.response?.status === 403) {
      return [];
    }
    console.warn('❌ 즐겨찾기 조회 실패:', err);
    return [];
  }
};

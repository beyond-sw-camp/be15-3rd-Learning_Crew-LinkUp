// src/api/utils/favorite.js
import api from './axios';

// 즐겨찾기 등록
export const createFavorite = (placeId, payload) => {
  return api.post(`/common-service/places/${placeId}`, payload); // { memberId }
};

// 즐겨찾기 삭제
export const deleteFavorite = (placeId, memberId) => {
  return api.delete(`/common-service/places/${placeId}`, {
    params: { memberId }
  });
};
// 즐겨찾기된 장소 ID 목록 조회
export const getFavoritePlaceIds = (memberId) => {
  return api.get(`/common-service/user/${memberId}/favorite`);
};

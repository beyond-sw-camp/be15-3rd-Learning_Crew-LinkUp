// @/api/place.js
import api from './axios';

// ✅ 장소 목록 조회 (공개 API → 인증/쿠키 필요 없음)
export const getPlaceList = () => {
  return api.get('/common-service/places', {
    withCredentials: false
  });
};

// ✅ 장소 상세 조회 (인증 필요 → 기본 axios 설정 사용)
export const getPlaceDetail = (placeId) => {
  return api.get(`/common-service/places/${placeId}`);
};

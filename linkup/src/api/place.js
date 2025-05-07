// src/api/place.js
import api from './axios';

export const getPlaceList = (params = {}) => {
  return api.get('/common-service/places', {
    params,
    withCredentials: false
  });
};

export const getPlaceDetail = (placeId) => {
  return api.get(`/common-service/place/${placeId}`);
};

export const getPlacesByOwner = (ownerId) => {
  return api.get(`/common-service/owner/${ownerId}/places`);
};

export const createPlace = (formData) => {
  return api.post('/common-service/place', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

let placeRegisterCache = {
  basicInfo: null,
  operationInfo: null,
  images: []
};

export const saveBasicPlaceInfo = (data, files) => {
  placeRegisterCache.basicInfo = data;
  placeRegisterCache.images = files;
};

export const saveOperationInfo = (data) => {
  placeRegisterCache.operationInfo = data;
};

export const saveImages = (files) => {
  placeRegisterCache.images = files;
};

export const getPlaceRegisterCache = () => {
  return placeRegisterCache;
};

export const clearPlaceRegisterCache = () => {
  placeRegisterCache = {
    basicInfo: null,
    operationInfo: null,
    images: []
  };
};

export const buildPlaceRegisterFormData = () => {
  const { basicInfo, operationInfo, images } = getPlaceRegisterCache();

  const formData = new FormData();

  // ✅ JSON으로 직렬화해서 Blob으로 감싸고 key는 반드시 'placeCreateRequest'로!
  const requestJson = JSON.stringify({
    ownerId: basicInfo.ownerId,
    sportId: basicInfo.sportId,
    placeName: basicInfo.placeName,
    address: basicInfo.address,
    description: basicInfo.description || '',
    equipment: basicInfo.equipment || '',
    minUser: basicInfo.minUser,
    maxUser: basicInfo.maxUser,
    isActive: basicInfo.isActive,
    rentalCost: basicInfo.rentalCost,
    operationTimes: operationInfo,
  });

  formData.append(
    'placeCreateRequest',
    new Blob([requestJson], { type: 'application/json' })
  );

  // 이미지 파일도 함께 첨부
  images.forEach((file) => {
    formData.append('placeImgs', file);
  });

  return formData;
};



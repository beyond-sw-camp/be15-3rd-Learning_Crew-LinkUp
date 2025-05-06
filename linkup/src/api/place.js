// @/api/place.js
import api from './axios';

export const getPlaceList = () => {
  return api.get('/common-service/places', {
    withCredentials: false
  });
};

export const getPlaceDetail = (placeId) => {
  return api.get(`/common-service/place/${placeId}`);
};

export const getPlacesByOwner = (ownerId) => {
  return api.get(`/common-service/owner/${ownerId}/places`);
};

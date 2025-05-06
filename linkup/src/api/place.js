import axios from './axios';

export const getPlaceList = () => {
  return axios.get(`/places`);
};

export const getPlaceDetail = (placeId) => {
  return axios.get(`/places/${placeId}`);
};

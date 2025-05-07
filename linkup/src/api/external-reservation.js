import api from './axios';

export const createExternalReservation = (payload) =>
  api.post('/common-service/external/reservation', payload);

export const deleteExternalReservation = (reservationId) =>
  api.delete(`/common-service/external/reservation/${reservationId}`);

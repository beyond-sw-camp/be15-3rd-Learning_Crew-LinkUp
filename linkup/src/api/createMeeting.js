import api from './axios.js';
import { refreshUserToken } from '@/api/user.js';
import { useAuthStore } from '@/stores/auth.js';

// 🆕 모임 생성 API
export const createMeeting = async (payload) => {
  const authStore = useAuthStore();

  try {
    const response = await api.post('/api/meetings', payload);
    return response;
  } catch (error) {
    const { response, config } = error;
    const errorCode = response?.data?.errorCode;

    if (response?.status === 401 && errorCode === 'EXPIRED_JWT' && !config._retry) {
      config._retry = true;

      try {
        const refreshRes = await refreshUserToken();
        const { accessToken, userName, profileImageUrl } = refreshRes.data.data;

        authStore.setAuth(accessToken, userName, profileImageUrl);
        config.headers.Authorization = `Bearer ${accessToken}`;

        return await api(config); // 원래 요청 재시도
      } catch (refreshErr) {
        console.error('🔁 모임 생성 - 토큰 갱신 실패:', refreshErr);
        await authStore.logout();
      }
    }

    console.error('❌ 모임 생성 실패:', error);
    throw error; // 실패한 에러는 상위에서 처리하도록 throw
  }
};

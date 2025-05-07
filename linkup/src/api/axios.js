/* 요청, 응답에 공통적으로 적용 될 부분을 axios 객체로 정의 */
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js';
import { logoutUser, refreshUserToken } from '@/api/user.js';
import { showErrorToast, showSuccessToast } from '@/utill/toast.js';
import { stopLoading } from '@/composables/useLoadingBar.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // HttpOnly Cookie 사용하실 경우
  withCredentials: true,
});

// 해당 객체를 통해 요청을 하면 interceptor에 의해 access token이 header에 삽입 된다
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    stopLoading();
    console.log(response.data);
    // 성공한 경우에도 메시지 띄워줄 수 있음
    if (response.config.method !== 'get') {
      showSuccessToast(response.data.message);
    }
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    const { config, response } = error;

    if (!response) {
      // 서버로부터 응답 자체가 없을 때 (네트워크 오류 등)
      showErrorToast('서버와 연결할 수 없습니다. 인터넷 상태를 확인해주세요.');
      return Promise.reject(error);
    }

    const status = response.status;
    const errorCode = response.data?.errorCode || null;
    const message = response.data?.message || '알 수 없는 오류가 발생했습니다.';

    console.log(status, errorCode, message);

    // 1. 리프레시 요청 중 401 발생 → 바로 로그아웃
    if (config.url.includes('/auth/refresh')) {
      await authStore.clearAuth();
      showErrorToast('세션이 만료되었습니다. 다시 로그인해주세요.');
      return Promise.reject(error);
    }

    // 2. 인증 실패(401) 처리
    if (status === 401) {
      if (config._retry) {
        await authStore.clearAuth();
        showErrorToast('인증이 만료되었습니다. 다시 로그인해주세요.');
        return Promise.reject(error);
      }

      //시도한 것을 카운트
      config._retry = true;

      // 에러코드별로 분기
      if (errorCode === 'EXPIRED_JWT') {
        try {
          const refreshRes = await refreshUserToken();
          const { accessToken, userName, profileImageUrl } = refreshRes.data.data;
          authStore.setAuth(accessToken, userName, profileImageUrl);
          config.headers.Authorization = `Bearer ${accessToken}`;
          return api(config); // 원래 요청 재시도
        } catch (refreshErr) {
          await authStore.logout();
          showErrorToast('세션이 만료되었습니다. 다시 로그인해주세요.');
          return Promise.reject(refreshErr);
        }
      } else if (['INVALID_JWT', 'EMPTY_JWT', 'UNAUTHORIZED_USER'].includes(errorCode)) {
        await authStore.logout();
        showErrorToast(message);
        return Promise.reject(error);
      } else {
        // 기타 401 에러
        showErrorToast(message);
        return Promise.reject(error);
      }
    }

    // 3. 권한 문제 (403 Forbidden)
    if (status === 403) {
      showErrorToast(message || '접근 권한이 없습니다');
      return Promise.reject(error);
    }

    // 4. 기타 서버 오류 처리
    if (status >= 400 && status < 500) {
      // 클라이언트 에러
      showErrorToast(message);
    } else if (status >= 500) {
      // 서버 에러
      showErrorToast(message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    return Promise.reject(error);
  },
);

export default api;

<<<<<<< HEAD
import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import { refreshUserToken } from "@/api/user.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

// 요청 인터셉터 - 인증 토큰 삽입
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  // 개발용 강제 토큰 삽입 제거됨
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }

  return config;
});

// 응답 인터셉터 - 토큰 만료 시 자동 갱신
api.interceptors.response.use(
<<<<<<< HEAD
  (res) => res,
  async (err) => {
    const authStore = useAuthStore();
    const { config, response } = err;

    if (config.url.includes("/auth/refresh")) {
      await authStore.clearAuth();
      return Promise.reject(err);
    }

    if (response?.status === 401) {
      if (config._retry) {
        await authStore.clearAuth();
        return Promise.reject(err);
      }

      config._retry = true;

      try {
        const refreshRes = await refreshUserToken();
        const newToken = refreshRes.data.data.accessToken;
        authStore.setAuth(newToken);

        config.headers.Authorization = `Bearer ${newToken}`;
        return api(config);
      } catch (refreshErr) {
        await authStore.clearAuth();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
=======
  (response) => response,
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
      config._retry = true;

      // 에러코드별로 분기
      if (errorCode === 'EXPIRED_JWT') {
        try {
          const refreshRes = await refreshUserToken();
          const newToken = refreshRes.data.data.accessToken;
          authStore.setAuth(newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
          return api(config); // 원래 요청 재시도
        } catch (refreshErr) {
          await authStore.clearAuth();
          showErrorToast('세션이 만료되었습니다. 다시 로그인해주세요.');
          return Promise.reject(refreshErr);
        }
      } else if (['INVALID_JWT', 'EMPTY_JWT', 'UNAUTHORIZED_USER'].includes(errorCode)) {
        await authStore.clearAuth();
        showErrorToast('로그인이 필요합니다.');
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
>>>>>>> 7aa1c8eca7d89582a42424ed0c5b26eefb5c83d1
);

export default api;

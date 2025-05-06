import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import { refreshUserToken } from "@/api/user.js";

// 개발 중 테스트용 AccessToken (.env.development에 반드시 설정)
const DEV_TOKEN = import.meta.env.VITE_DEV_ACCESS_TOKEN;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // if using cookies for auth
});

// 요청 인터셉터 - 토큰 삽입
api.interceptors.request.use(config => {
  const authStore = useAuthStore();

  // [DEV ONLY] 로그인 미구현 상태에서 강제 토큰 사용
  const token = authStore.accessToken || (import.meta.env.MODE === 'development' ? DEV_TOKEN : null);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터 - 토큰 만료 시 자동 재발급
api.interceptors.response.use(
  res => res,
  async err => {
    const authStore = useAuthStore();
    const { config, response } = err;

    if (config.url.includes('/auth/refresh')) {
      await authStore.clearAuth(); // refresh 실패 시 강제 로그아웃
      return Promise.reject(err);
    }

    if (response?.status === 401) {
      if (config._retry) {
        await authStore.clearAuth(); // 재시도 했는데 또 실패 → 로그아웃
        return Promise.reject(err);
      }

      config._retry = true;

      try {
        const refreshRes = await refreshUserToken();
        const newToken = refreshRes.data.data.accessToken;
        authStore.setAuth(newToken);

        config.headers.Authorization = `Bearer ${newToken}`;
        return api(config); // 원래 요청 재시도
      } catch (refreshErr) {
        await authStore.clearAuth();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;

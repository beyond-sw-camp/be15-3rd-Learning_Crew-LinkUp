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
);

export default api;

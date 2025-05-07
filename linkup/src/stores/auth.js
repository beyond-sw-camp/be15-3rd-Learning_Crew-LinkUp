import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { connectSse, disconnectSse } from '@/api/utils/sse.js';
import { showErrorToast } from '@/utill/toast.js';
import { loginUser, logoutUser, refreshUserToken } from '@/api/user.js';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(null);
  const userRole = ref(null);
  const expirationTime = ref(null);
  const userName = ref(null);
  const profileImageUrl = ref(null);
  const userId = ref(null);

  // 인증 되어 있는지 확인하는 getter 값
  const isAuthenticated = computed(
    () => !!accessToken.value && Date.now() < (expirationTime.value || 0),
  );

  function setAuth(at, un, pi) {
    accessToken.value = at;
    userName.value = un;
    profileImageUrl.value = pi;
    try {
      const payload = JSON.parse(atob(at.split('.')[1]));
      userRole.value = payload.role;
      expirationTime.value = payload.exp * 1000;
      userId.value = payload.sub;

      // SSE 연결 시작
       connectSse(userId.value);
    } catch (e) {
      accessToken.value = null;
      userRole.value = null;
      expirationTime.value = null;
    }
  }

  async function login(data) {
    try {
      const res = await loginUser(data);
      const tokens = res.data.data;

      accessToken.value = tokens.accessToken;
      userName.value = tokens.userName;
      profileImageUrl.value = tokens.profileImageUrl;

      // JWT Payload 파싱
      const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
      userRole.value = payload.role;
      expirationTime.value = payload.exp * 1000;
      userId.value = payload.sub;
      connectSse(userId.value);
    } catch (err) {
      showErrorToast('로그인에 실패했습니다.');
      throw err;
    }
  }

  async function logout() {
    try {
      await logoutUser();
    } catch (err) {
      console.error('로그아웃 요청 실패', err);
    } finally {
      clearAuth();
    }
  }

  async function refresh() {
    try {
      const res = await refreshUserToken();
      const tokens = res.data.data;

      accessToken.value = tokens.accessToken;
      userName.value = tokens.userName;
      profileImageUrl.value = tokens.profileImageUrl;

      const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
      userRole.value = payload.role;
      expirationTime.value = payload.exp * 1000;
      userId.value = payload.sub;
    } catch (err) {
      console.error('토큰 갱신 실패', err);
      clearAuth();
      throw err;
    }
  }

  function clearAuth() {
    accessToken.value = null;
    userRole.value = null;
    expirationTime.value = null;
    userName.value = null;
    profileImageUrl.value = null;
    userId.value = ref(null);
    disconnectSse(); // ✅ 로그아웃 시 SSE 연결 해제
  }

  return {
    accessToken,
    userRole,
    expirationTime,
    isAuthenticated,
    userName,
    profileImageUrl,
    setAuth,
    clearAuth,
    login,
    userId,
    refresh,
    logout,
  };
});

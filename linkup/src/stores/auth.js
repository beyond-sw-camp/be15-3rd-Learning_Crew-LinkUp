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
  const pointBalance = ref(null);

  //타이머 변수 초기화
  let refreshTimer = null;

  function setupRefreshTimer() {
    clearRefreshTimer(); // 혹시 이전 타이머 있으면 제거

    if (!expirationTime.value) return; // 만료 시간이 없으면 설정 안 함

    const now = Date.now();
    const timeUntilExpiry = expirationTime.value - now;
    const timeUntilRefresh = timeUntilExpiry - 60000; // 1분(60초) 전

    if (timeUntilRefresh <= 0) {
      // 이미 거의 만료된 상태면 즉시 리프레시
      refresh();
      return;
    }

    refreshTimer = setTimeout(async () => {
      try {
        await refresh();
        setupRefreshTimer(); // 성공하면 다시 타이머 재설정
      } catch (err) {
        console.error('토큰 자동 갱신 실패', err);
        await logoutUser();
      }
    }, timeUntilRefresh);
  }

  function clearRefreshTimer() {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
  }

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

      setupRefreshTimer();
    } catch (e) {
      accessToken.value = null;
      userRole.value = null;
      expirationTime.value = null;
    }
  }

  function setPointBalance(pb) {
    pointBalance.value = pb;
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

      setupRefreshTimer();
      // SSE 연결 시작
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

      setupRefreshTimer();
      // SSE 연결 시작
      connectSse(userId.value);
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
    pointBalance.value = null;
    disconnectSse(); //  로그아웃 시 SSE 연결 해제
    clearRefreshTimer();
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
    setPointBalance,
    pointBalance,
  };
});

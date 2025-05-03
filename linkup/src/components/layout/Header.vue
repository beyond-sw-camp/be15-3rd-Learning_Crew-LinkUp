<script setup>
// 별도 스크립트 없음
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="logo-container">
        <RouterLink to="/" aria-label="Linkup Home">
          <img class="logo" src="@/assets/icons/logo.svg" alt="Linkup 로고" />
        </RouterLink>
      </h1>
      <nav class="nav" aria-label="메인 네비게이션">
        <ul class="nav-list">
          <li><RouterLink class="nav-link" to="/likes">커뮤니티</RouterLink></li>
          <li><RouterLink class="nav-link" to="/community">모임</RouterLink></li>
          <li><RouterLink class="nav-link" to="/create">장소</RouterLink></li>
          <li><RouterLink class="nav-link" to="/login">로그인/회원가입</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  @apply h-[80px] bg-indigo-100 shadow-sm flex-shrink-0 px-8;
}

.header-inner {
  @apply h-full flex justify-between items-center max-w-full mx-auto;
}

.logo-container {
  @apply flex items-center p-12;
}

.logo {
  @apply w-[48px] h-[48px];
}

.nav {
  @apply flex items-center;
}

.nav-list {
  @apply flex space-x-12 items-center;
}

.nav-link {
  @apply text-text-default font-medium text-bodyMd relative py-1 transition hover:text-primary-default;
}
</style>

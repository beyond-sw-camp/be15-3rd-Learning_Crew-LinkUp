<script setup>
import Navigation from '@/components/layout/Navigation.vue';
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="logo-container">
        <RouterLink to="/" aria-label="Linkup Home">
          <img class="logo" src="@/assets/icons/logo.svg" alt="Linkup 로고" />
        </RouterLink>
      </h1>
      <Navigation />

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
</style>

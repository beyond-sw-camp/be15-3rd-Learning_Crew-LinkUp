<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '350px',
  },
  mainClass: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <main class="layout-wrapper">
    <section :class="`main-wrapper ${mainClass}`" aria-label="페이지 주요 콘텐츠">
      <slot />
    </section>
  </main>
</template>

<style scoped>
.layout-wrapper {
  @apply min-h-[calc(100vh-100px)] bg-background-default flex flex-col p-[20px];
}

.main-wrapper {
  @apply relative flex-1 min-w-[300px] mx-auto bg-white rounded-sm shadow-md p-[40px] z-20 flex flex-col;
}

@media (max-width: 768px) {
  .layout-wrapper {
    @apply p-[16px];
  }

  .main-wrapper {
    @apply p-[20px] w-full rounded-md;
  }
}
</style>

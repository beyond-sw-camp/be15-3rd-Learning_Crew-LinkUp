<template>
  <main class="layout-wrapper" aria-label="전체 중앙정렬 레이아웃">
    <section class="content-wrapper" aria-label="주요 콘텐츠 영역">
      <slot />
    </section>
  </main>
</template>

<style scoped>
.layout-wrapper {
  @apply min-h-[calc(100vh-100px)] flex items-center justify-center bg-background-default;
}

.content-wrapper {
  @apply relative z-20 min-w-[300px] bg-white rounded-sm shadow-lg p-[40px];
}
</style>

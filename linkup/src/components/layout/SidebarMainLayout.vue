<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '350px',
  },
  sidebarClass: {
    type: String,
    default: '',
  },
  mainClass: {
    type: String,
    default: '',
  },
});

const sidebarWidth = props.width;
</script>

<template>
  <main class="layout">
    <slot />
    <aside
      :style="{ width: sidebarWidth }"
      :class="`sidebar ${sidebarClass}`"
      aria-label="사이드바"
    >
      <slot name="sidebar" />
    </aside>
    <section :class="`main-content ${mainClass}`" aria-label="메인 콘텐츠">
      <slot name="main" />
    </section>
  </main>
</template>

<style scoped>
.layout {
  @apply flex h-full relative;
}

.sidebar {
  @apply flex-shrink-0;
}

.main-content {
  @apply flex-1 bg-background-muted;
}
</style>

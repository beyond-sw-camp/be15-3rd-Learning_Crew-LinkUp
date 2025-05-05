<script setup>
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
</script>

<template>
  <SidebarMainLayout width="350px" mainClass="h-[calc(100vh-100px)]">
    <template #sidebar>
      <h2>사이드바입니다</h2>
    </template>

    <template #main>
      <h2>메인영역입니다</h2>
    </template>
  </SidebarMainLayout>
</template>

<style scoped></style>

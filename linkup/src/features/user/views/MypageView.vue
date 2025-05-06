<script setup>
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import SidebarMenu from '@/features/user/components/SidebarMenu.vue';
const isLoading = ref(true);
</script>

<template>
  <SidebarMainLayout width="350px" mainClass="h-[calc(100vh-100px)]">
    <template #sidebar>
      <SidebarMenu />
    </template>

    <template #main>
      <RouterView />
    </template>
  </SidebarMainLayout>
</template>

<style scoped></style>

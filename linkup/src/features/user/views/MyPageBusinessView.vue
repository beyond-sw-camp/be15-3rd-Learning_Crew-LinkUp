<script setup>
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import SidebarMenuBusiness from '@/features/user/components/SidebarMenuBusiness.vue';
import { useAuthStore } from '@/stores/auth.js';
</script>

<template>
  <SidebarMainLayout width="350px" mainClass="h-[calc(100vh-100px)]">
    <template #sidebar>
      <SidebarMenuBusiness />
    </template>

    <template #main>
      <RouterView />
    </template>
  </SidebarMainLayout>
</template>

<style scoped></style>

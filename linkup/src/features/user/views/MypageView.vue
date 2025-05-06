<script setup>
import SidebarMainLayout from '@/components/layout/SidebarMainLayout.vue';
import SidebarMenuUser from '@/features/user/components/SidebarMenuUser.vue';
import DefaultMainLayout from '@/components/layout/DefaultMainLayout.vue';
</script>

<template>
  <SidebarMainLayout width="350px">
    <template #sidebar>
      <SidebarMenuUser />
    </template>

    <template #main>
      <DefaultMainLayout main-class="w-[500px]">
        <RouterView />
      </DefaultMainLayout>
    </template>
  </SidebarMainLayout>
</template>

<style scoped></style>

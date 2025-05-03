<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import '@/assets/css/init-styles.css'

// 현재 경로
const route = useRoute()

// /admin으로 시작하면 관리자 페이지임
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <main class="app-main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>

</style>
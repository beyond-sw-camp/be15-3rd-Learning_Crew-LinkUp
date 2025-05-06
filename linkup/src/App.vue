<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted } from 'vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { useToast } from 'vue-toastification'
import { emitter } from '@/api/utils/sse.js'

// 현재 경로
const route = useRoute();

// /admin 경로 기반 필터링
const isAdminRoute = computed(() => route.path.startsWith('/admin'));


const toast = useToast()

function handleNotification(data) {
  toast.info(`📢 ${data.title}\n${data.content}`, { timeout: 5000 })
}

onMounted(() => {
  emitter.on('new-notification', handleNotification)
})

onUnmounted(() => {
  emitter.off('new-notification', handleNotification)
})

</script>

<template>
  <!-- 일반 사용자 헤더만 조건부 출력 -->
  <Header v-if="!isAdminRoute" />
  <!-- 공통 라우터 뷰 (AdminLayout 포함됨) -->
  <RouterView />
  <Footer />
</template>


<style scoped>

</style>

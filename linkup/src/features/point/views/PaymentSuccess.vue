<script setup>
import { useRoute, useRouter } from 'vue-router';
import { usePointPayment } from '@/features/point/composables/usePointPayment.js';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { confirmPointPayment } = usePointPayment();

onMounted(async () => {
  const { orderId, paymentKey, amount } = route.query;

  if (!orderId || !paymentKey || !amount) {
    toast.error('❌ 결제 정보가 누락되었습니다.');
    router.replace('/');
    return;
  }

  try {
    const success = await confirmPointPayment({
      orderId,
      paymentKey,
      amount: parseInt(amount, 10),
    });

    if (success) {
      toast.success('✅ 포인트 충전이 완료되었습니다!');
      router.replace('/mypage/points'); // 포인트 내역 페이지로 이동
    } else {
      toast.error('❌ 결제 확인에 실패했습니다.');
      router.replace('/');
    }
  } catch (err) {
    console.error('결제 확인 에러:', err);
    toast.error('❌ 처리 중 오류가 발생했습니다.');
    router.replace('/');
  }
});
</script>

<template>
  <div class="payment-success-page">
    <p>🔄 결제 확인 중입니다. 잠시만 기다려주세요...</p>
  </div>
</template>

<style scoped>
.payment-success-page {
  text-align: center;
  margin-top: 100px;
  font-size: 18px;
}
</style>
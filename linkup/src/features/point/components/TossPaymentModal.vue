<template>
  <div v-if="visible" class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <h2>충전할 금액을 선택하세요</h2>
      <div class="card-grid">
        <div
            v-for="option in amounts"
            :key="option"
            class="amount-card"
            :class="{ selected: amount === option }"
            @click="amount = option"
        >
          {{ option.toLocaleString() }}원
        </div>
      </div>

      <button class="pay-button" :disabled="!amount" @click="pay">
        {{ amount ? `${amount.toLocaleString()}원 결제하기` : '금액 선택해주세요' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['close', 'complete']);

const amounts = [3000, 5000, 10000, 15000, 20000, 30000, 50000, 100000];
const amount = ref(null);
const clientKey = 'test_ck_E92LAa5PVb5dpK1k4EwP37YmpXyJ';
const pay = () => {
  if (!amount.value) return;

  const tossPayments = window.TossPayments(clientKey);
  const orderId = `order-${Date.now()}`;

  tossPayments.requestPayment('카드', {
    amount: amount.value,
    orderId,
    orderName: '포인트 충전',
    successUrl: `${window.location.origin}/payments/success`,
    failUrl: `${window.location.origin}/payments/fail`,
    customerName: '홍길동',
  }).then((response) => {
    const paymentKey = response.paymentKey; // ✅ paymentKey 추출
    emit('complete', { amount: amount.value, orderId, paymentKey });
  }).catch((error) => {
    console.error('결제 실패', error);
  });
};

const emitClose = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.amount-card {
  padding: 1rem;
  border: 2px solid #dcdcdc;
  border-radius: 12px;
  background-color: #f9f9f9;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

.amount-card:hover {
  background-color: #e0f0ff;
  border-color: #3498db;
}

.amount-card.selected {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.pay-button {
  padding: 0.75rem 1.5rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.pay-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

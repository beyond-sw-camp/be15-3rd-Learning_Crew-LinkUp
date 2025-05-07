<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="title">
        <i class="fa-solid fa-calendar-plus mr-2"></i>
        외부 예약 등록
      </h2>

      <!-- 외부 예약 리스트 -->
      <div
        v-for="(item, index) in reservations"
        :key="index"
        class="reservation-row"
      >
        <input type="date" v-model="item.date" required />
        <input type="time" v-model="item.startTime" required />
        <input type="time" v-model="item.endTime" required />
        <button @click="removeReservation(index)" class="btn-remove">
          삭제
        </button>
      </div>

      <!-- 예약 추가 버튼 -->
      <button @click="addReservation" class="btn-outline">+ 외부 예약 추가</button>

      <!-- 저장/닫기 -->
      <div class="button-group">
        <button class="btn-secondary" @click="$emit('close')">닫기</button>
        <button class="btn-primary" @click="saveReservations">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createExternalReservation } from '@/api/external-reservation';

const props = defineProps({
  place: Object, // 반드시 전달받아야 함
});

const emit = defineEmits(['close']);

const reservations = ref([
  { date: '', startTime: '', endTime: '' },
]);

function addReservation() {
  reservations.value.push({ date: '', startTime: '', endTime: '' });
}

function removeReservation(index) {
  reservations.value.splice(index, 1);
}

async function saveReservations() {
  try {
    for (const r of reservations.value) {
      await createExternalReservation({
        placeId: props.place.placeId, // ✅ placeId 포함
        date: r.date,
        startTime: r.startTime,
        endTime: r.endTime,
      });
    }
    alert('저장 완료!');
    emit('close');
  } catch (err) {
    console.error('저장 실패', err);
    alert('저장 중 오류가 발생했습니다.');
  }
}
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
}
.modal-content {
  @apply bg-white p-6 rounded-lg w-[90%] max-w-xl shadow-md;
}
.title {
  @apply text-lg font-semibold mb-4;
}
.reservation-row {
  @apply flex gap-2 items-center mb-2;
}
input {
  @apply border p-2 rounded w-full;
}
.btn-remove {
  @apply bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600;
}
.btn-outline {
  @apply border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 mb-4;
}
.button-group {
  @apply flex justify-between;
}
.btn-secondary {
  @apply bg-gray-200 px-4 py-2 rounded;
}
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
}
</style>

<template>
  <h2>시작 시간</h2>
  <section class="time-selector">
    <div style="display: flex; gap: 10px; margin-bottom: 16px">
      <select v-model="selectedMeridiem" class="time-select">
        <option value=""></option>
        <option value="0">오전</option>
        <option value="1">오후</option>
      </select>
      <select v-model="selectedHour" class="time-select">
        <option value=""></option>
        <option v-for="i in 12" :key="i" :value="i">{{ i < 10 ? '0' + i : i }}</option>
      </select>
      <div class="time-select-none">시</div>
      <select v-model="selectedMinute" class="time-select">
        <option value=""></option>
        <option v-for="i in [0, 10, 20, 30, 40, 50]" :key="i" :value="i">
          {{ i < 10 ? '0' + i : i }}
        </option>
      </select>
      <div class="time-select-none">분</div>
    </div>
  </section>

  <h2>운동 시간</h2>
  <select v-model="selectedDuration" class="time-select" style="width: 100%; max-width: 200px">
    <option v-for="i in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]" :key="i" :value="i">
      {{ i }} 분
    </option>
  </select>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

defineProps({
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue']);

const selectedMeridiem = ref('');
const selectedHour = ref('');
const selectedMinute = ref('');
const selectedDuration = ref(0);

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));
const durations = Array.from({ length: 12 }, (_, i) => (i + 1) * 10);

// 선택된 시간 (오전/오후, 시, 분)으로 startTime과 endTime을 계산하는 computed 속성
const startTime = computed(() => {
  return `${selectedMeridiem.value === '0' ? 'AM' : 'PM'} ${selectedHour.value}:${selectedMinute.value}`;
});

const endTime = computed(() => {
  if (selectedMeridiem.value && selectedHour.value && selectedMinute.value && selectedDuration.value) {
    const startHour = (parseInt(selectedMeridiem.value) * 12) + parseInt(selectedHour.value);
    const startMinute = parseInt(selectedMinute.value);
    const duration = parseInt(selectedDuration.value);

    const start = new Date();
    start.setHours(startHour);
    start.setMinutes(startMinute);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + duration);

    return `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
  }
  return '';
});

// 부모로 selectedTimeSlot 전달
watch([selectedMeridiem, selectedHour, selectedMinute, selectedDuration], () => {
  if (startTime.value && endTime.value) {
    emit('update:modelValue', { startTime: startTime.value, endTime: endTime.value });
  }
});
</script>

<style scoped>
.time-selector {
  margin-top: 20px;
}

.time-select {
  padding: 8px;
  font-size: 14px;
  width: 100%;
  max-width: 100px;
}

.time-select-none {
  line-height: 38px;
}
</style>
<template>
  <main class="register-page">
    <div class="step-indicator">
      <div class="step">1. 기본 정보 입력</div>
      <div class="line"></div>
      <div class="step active">2. 운영 정보 입력</div>
    </div>

    <h1 class="page-title">운영 정보 입력</h1>

    <section class="form-section">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>요일별 운영시간 설정</label>
          <div
            class="day-schedule"
            v-for="(day, i) in days"
            :key="day.value"
          >
            <div class="day-label">{{ day.label }}</div>
            <div class="time-selects">
              <select v-model="day.start">
                <option value="">-- 시작시간 --</option>
                <option v-for="time in timeOptions" :key="time" :value="time">
                  {{ time }}
                </option>
              </select>
              ~
              <select v-model="day.end">
                <option value="">-- 종료시간 --</option>
                <option v-for="time in timeOptions" :key="time" :value="time">
                  {{ time }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" class="submit-btn">등록 완료 ➔</button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  saveOperationInfo,
  buildPlaceRegisterFormData,
  createPlace,
  clearPlaceRegisterCache,
} from '@/api/place';

const router = useRouter();

const timeOptions = [];
for (let h = 0; h < 24; h++) {
  const hour = h.toString().padStart(2, '0');
  timeOptions.push(`${hour}:00`, `${hour}:30`);
}

const days = ref([
  { label: '월요일', value: 'MONDAY', start: '', end: '' },
  { label: '화요일', value: 'TUESDAY', start: '', end: '' },
  { label: '수요일', value: 'WEDNESDAY', start: '', end: '' },
  { label: '목요일', value: 'THURSDAY', start: '', end: '' },
  { label: '금요일', value: 'FRIDAY', start: '', end: '' },
  { label: '토요일', value: 'SATURDAY', start: '', end: '' },
  { label: '일요일', value: 'SUNDAY', start: '', end: '' },
]);

const handleSubmit = async () => {
  const operationTimes = days.value
    .filter((d) => d.start && d.end)
    .map((d) => ({
      dayOfWeek: d.value,
      startTime: d.start,
      endTime: d.end,
    }));

  saveOperationInfo(operationTimes);

  try {
    const formData = buildPlaceRegisterFormData();
    await createPlace(formData);
    clearPlaceRegisterCache();
    router.push('/place/register/complete');
  } catch (err) {
    alert('장소 등록에 실패했습니다.');
    console.error(err);
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f3fc;
  color: #1a1a1a;
}
.register-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px;
}
.step-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.step {
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b7280;
  position: relative;
}
.step.active {
  color: #5790ff;
}
.line {
  flex-grow: 1;
  height: 2px;
  background-color: #e6e6e6;
  margin: 0 8px;
}
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 36px;
  text-align: center;
}
.form-section {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.form-group {
  margin-bottom: 24px;
}
label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #6b7280;
}
.day-schedule {
  margin-bottom: 16px;
}
.day-label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1a1a1a;
}
.time-selects {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  align-items: center;
}
select {
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: #ffffff;
  flex: 1;
}
.submit-btn {
  margin-top: 32px;
  width: 100%;
  background-color: #5790ff;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
.submit-btn:hover {
  background-color: #365ec9;
}
</style>

<template>
  <h2>날짜 선택</h2>
    <div class="calendar">
      <div class="calendar-header">
        <button id="prevMonth" @click="prevMonth">◀</button>
        <h2 id="calendar-title">{{ `${currentYear}.${currentMonth + 1}` }}</h2>
        <button id="nextMonth" @click="nextMonth">▶</button>
      </div>
      <table class="calendar-table">
        <thead>
        <tr>
          <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
        </tr>
        </thead>
        <tbody id="calendar-body">
        <tr v-for="(row, rowIndex) in weeks" :key="rowIndex">
          <td
            v-for="(date, colIndex) in row"
            :key="colIndex"
            :class="{'disabled': !isSelectable(date),
            'active': isActive(date)}"
            @click="selectDate(date)"
          >
            {{ date || '' }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// defineProps로 부모로부터 전달된 modelValue를 정의
const props = defineProps({
  modelValue: Date, // 부모에서 전달받은 modelValue
})

const emit = defineEmits(['update:modelValue']) // 자식에서 부모로 값을 전달할 이벤트

// 달력 상태
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const selectedDate = ref(null)

// 날짜 선택
const selectDate = (day) => {
  if (isSelectable(day)) {
    selectedDate.value = new Date(currentYear.value, currentMonth.value, day)
    emit('update:modelValue', selectedDate.value) // 부모로 선택된 날짜 전달
  }
}

// 다음 달, 이전 달
const nextMonth = () => {
  currentMonth.value++
  if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

const prevMonth = () => {
  currentMonth.value--
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  }
}

// 해당 날짜가 선택 가능한지 여부
const isSelectable = (day) => {
  const today = new Date()
  const selectedDate = new Date(currentYear.value, currentMonth.value, day)
  return selectedDate >= today // 오늘 이후 날짜만 선택 가능
}

// selectedDate 값이 변경되면 스타일 반영 여부 확인
const isActive = (date) => {
  return selectedDate.value && selectedDate.value.getDate() === date;
}

// 달력에 보여줄 날짜 배열 계산
const weeks = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const lastDate = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const days = []

  // 빈칸 추가 (첫 번째 주에 일요일 이전 날들)
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // 실제 날짜들
  for (let i = 1; i <= lastDate; i++) {
    days.push(i)
  }

  // 7일씩 나누기
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return weeks
})

// selected 값이 바뀔 때마다 선택된 날짜 갱신
watch(() => props.modelValue, (newValue) => {
  selectedDate.value = newValue
})
</script>

<style scoped>
.calendar {
  text-align: center;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table th,
.calendar-table td {
  width: 14.2%;
  height: 40px;
  text-align: center;
  vertical-align: middle;
}

.calendar-table td {
  cursor: pointer;
  border-radius: 50%;
}

.calendar-table td.disabled {
  color: #ccc;
  pointer-events: none;
}

.calendar-table td.active {
  background: linear-gradient(to right, #d5d7f8, #fce4ec);
  color: #5a3e85;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
</style>

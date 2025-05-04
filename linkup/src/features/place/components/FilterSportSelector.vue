<script setup>
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const sports = [
  { type: 'whole', label: '전체' },
  { type: 'etc', label: '기타 운동' },
  { type: 'football', label: '풋볼' },
  { type: 'tennis', label: '테니스' },
  { type: 'bowling', label: '볼링' },
  { type: 'pingpong', label: '탁구' },
  { type: 'basketball', label: '농구' },
  { type: 'golf', label: '골프' },
  { type: 'badminton', label: '배드민턴' }
]
</script>


<template>
  <div class="sport-select-wrapper">
    <label class="sport-select-label" for="sport-select">운동 종류:</label>
    <select
      id="sport-select"
      class="sport-select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="sport in sports" :key="sport.type" :value="sport.type">
        {{ sport.label }}
      </option>
    </select>
  </div>
</template>


<style scoped>
.sport-select-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-direction: column;
}

.sport-select-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.sport-select {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 12px;
  border: 1.5px solid #dcdfe5;
  background: #fff;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23666' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px 14px;
}
</style>

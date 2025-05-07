<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: '상세 정보' },
  description: { type: String, default: '' },
  summary: { type: Array, default: () => [] }, // label/value 쌍 배열로 가정
  headers: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  showActionButton: { type: Boolean, default: false },
  actionLabel: { type: String, default: '처리' }
})

const emit = defineEmits(['update:modelValue', 'action'])
const close = () => emit('update:modelValue', false)
</script>

<template>
  <div
    v-if="modelValue"
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @click.self="close"
  >
    <section class="modal-report">
      <!-- 헤더 -->
      <header>
        <h2 id="modal-title" class="modal-report-title">{{ title }}</h2>
        <p v-if="description" class="sub-text">{{ description }}</p>
      </header>

      <!-- 요약 정보 -->
      <section class="modal-report-section" aria-labelledby="summary-section">
        <h3 id="summary-section" class="sr-only">요약 정보</h3>
        <div class="report-detail-grid">
          <div
            class="info-report-item"
            v-for="item in summary"
            :key="item.label"
          >
            <span class="label"><strong>{{ item.label }}:</strong></span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </section>

      <!-- 테이블 -->
      <section class="modal-section" aria-labelledby="report-table-title">
        <h3 id="report-table-title" class="report-title">신고 목록</h3>
        <table class="table" role="table">
          <thead>
          <tr>
            <th v-for="header in headers" :key="header" scope="col">
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, idx) in rows" :key="idx">
            <td v-for="header in headers" :key="header">
              {{ row[header] ?? '-' }}
            </td>
          </tr>
          </tbody>
        </table>
      </section>

      <!-- 하단 버튼 -->
      <footer class="modal-buttons">
        <button
          v-if="showActionButton"
          class="btn btn-reject"
          @click="emit('action')"
        >
          {{ actionLabel }}
        </button>
        <button class="btn btn-secondary" @click="close">닫기</button>
      </footer>
    </section>
  </div>
</template>

<style scoped>

</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: '상세 정보' },
  description: { type: String, default: '' },
  summary: { type: Object, default: () => ({}) },
  headers: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  showActionButton: { type: Boolean, default: false },
  actionLabel: { type: String, default: '처리' }
})

const emit = defineEmits(['update:modelValue', 'action'])
const close = () => emit('update:modelValue', false)

const isOpen = computed(() => props.modelValue)
</script>

<template>
  <div v-if="isOpen" class="modal">
    <section class="modal-report" aria-modal="true" role="dialog">
      <!-- 헤더 -->
      <header>
        <h2 class="modal-report-title">{{ title }}</h2>
        <p class="sub-text" v-if="description">{{ description }}</p>
      </header>

      <!-- 요약 정보 섹션 -->
      <section class="modal-report-section" aria-labelledby="summary-section">
        <div class="report-detail-grid">
          <div class="info-report-item" v-for="(item, index) in summary" :key="index">
            <span class="label"><strong>{{ item.label }}:</strong></span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </section>


      <!-- 신고 목록 테이블 섹션 -->
      <section class="modal-section" aria-labelledby="report-table-section">
        <h3 class="report-title" id="report-table-section">신고 목록</h3>
        <table class="table" role="table">
          <thead>
          <tr>
            <th v-for="header in headers" :key="header" scope="col">{{ header }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, idx) in rows" :key="idx">
            <td v-for="key in Object.keys(row)" :key="key">{{ row[key] }}</td>
          </tr>
          </tbody>
        </table>
      </section>

      <!-- 버튼 영역 -->
      <footer class="modal-buttons">
        <button
          v-if="showActionButton"
          class="btn btn-reject"
          @click="$emit('action')"
        >
          {{ actionLabel }}
        </button>
        <button class="btn btn-secondary" @click="close">닫기</button>
      </footer>
    </section>
  </div>
</template>

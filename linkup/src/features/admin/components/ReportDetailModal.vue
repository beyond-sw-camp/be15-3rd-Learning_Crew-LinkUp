<script setup>
import DetailViewer from '@/features/admin/components/DetailViewer.vue'

defineProps({
  modelValue: Boolean,
  modalTitle: {
    type: String,
    default: '신고 상세 정보'
  },
  modalDescription: {
    type: String,
    default: '신고 관련 세부 내역을 확인할 수 있습니다.'
  },
  summaryInfo: Array,
  columns: Array,
  columnKeys: Array,
  reportRows: Array,
  showActionButton: Boolean,
  actionLabel: {
    type: String,
    default: '제재 처리'
  }
})

const emit = defineEmits(['update:modelValue', 'action'])
</script>


<template>
  <DetailViewer
    :model-value="modelValue"
    :title="modalTitle"
    :description="modalDescription"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
  <template #default>
      <!-- 요약 정보 -->
      <div class="modal-section">
        <div class="section-title">기본 정보</div>
        <div class="info-grid">
          <div
            v-for="(item, index) in summaryInfo"
            :key="index"
            class="info-item"
          >
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- 신고 목록 테이블 -->
      <div class="modal-section">
        <div class="section-title">신고 목록</div>
        <table class="table">
          <thead>
          <tr>
            <th v-for="(col, idx) in columns" :key="idx">{{ col }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, rIdx) in reportRows" :key="rIdx">
            <td v-for="(key, kIdx) in columnKeys" :key="kIdx">
              {{ row[key] || '-' }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 버튼 -->
      <div class="modal-buttons">
        <slot name="actions">
          <button
            v-if="showActionButton"
            class="btn btn-approve"
            @click="$emit('action')"
          >
            {{ actionLabel }}
          </button>
          <button class="btn btn-secondary" @click="$emit('update:modelValue', false)">닫기</button>
        </slot>
      </div>
    </template>
  </DetailViewer>
</template>


<style scoped>
/* 스타일은 admin-styles.css에서 사용 중인 것을 그대로 상속 */
</style>

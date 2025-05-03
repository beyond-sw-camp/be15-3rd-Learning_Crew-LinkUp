<script setup>
import '@/assets/css/admin-styles.css'
// 데이터/컬럼 구조가 다양하므로 slot 기반 구조
</script>

<template>
  <table class="admin-table table" role="table">
    <caption class="sr-only">관리자 데이터 테이블</caption>
    <thead role="rowgroup">
    <slot name="thead" />
    </thead>
    <tbody role="rowgroup">
    <slot name="tbody" />
    </tbody>
  </table>
</template>

<style scoped>
/* 시각적으로 숨기되 스크린리더가 읽을 수 있도록 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

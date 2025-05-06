<script setup>
import '@/assets/css/admin-styles.css'
// 데이터/컬럼 구조가 다양하므로 slot 기반 구성
</script>

<template>
  <table class="admin-table table">
    <caption class="sr-only">관리자 데이터 테이블</caption>
    <thead>
    <slot name="thead" />
    </thead>
    <tbody>
    <slot name="tbody" />
    </tbody>
  </table>
</template>

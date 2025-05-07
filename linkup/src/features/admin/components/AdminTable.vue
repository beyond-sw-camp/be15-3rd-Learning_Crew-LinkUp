<!-- src/features/admin/components/AdminTable.vue -->
<script setup>
// 이 컴포넌트는 admin 목록 테이블의 기본 뼈대를 구성합니다.
// 테이블 구조와 데이터는 모두 슬롯으로 전달받습니다.
import '@/assets/css/admin-styles.css'
</script>

<template>
  <table class="admin-table table">
    <!-- 접근성을 위한 테이블 캡션 (시각장애인 전용) -->
    <caption class="sr-only">관리자 데이터 테이블</caption>

    <!-- 헤더 슬롯 -->
    <thead>
    <tr>
      <slot name="thead" />
    </tr>
    </thead>

    <!-- 바디 슬롯 -->
    <tbody>
    <slot name="tbody" />
    </tbody>
  </table>
</template>

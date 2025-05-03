<script setup>
import '@/assets/css/admin-styles.css'

// 데이터/컬럼 구조가 다양하므로 slot 기반 구조
</script>


<template>
  <table class="admin-table">
    <thead>
    <slot name="thead" />
    </thead>
    <tbody>
    <slot name="tbody" />
    </tbody>
  </table>
</template>


<style scoped>

</style>

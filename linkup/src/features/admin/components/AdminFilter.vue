<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue"

defineProps({ title: String })

const emit = defineEmits(['search'])
const triggerSearch = () => emit('search')
</script>

<template>
  <section class="filter-wrapper">
    <h1 class="page-title" v-if="title?.trim()">{{ title }}</h1>
    <form class="filter-box" @submit.prevent="triggerSearch">
      <div class="filter-fields">
        <slot name="filters" />
      </div>
      <AdminButton type="primary">검색</AdminButton>
    </form>
  </section>
</template>

<style scoped>
.filter-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

select,
input[type="text"] {
  height: 32px;
  padding: 4px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
}

select:focus,
input[type="text"]:focus {
  outline: none;
  border-color: #7d6fb3;
  box-shadow: 0 0 0 2px rgba(125, 111, 179, 0.2);
}

/* 관리자 전용 클래스가 있다면 아래를 유지 */
.select-box {
  min-width: 120px;
}

.input-box {
  min-width: 160px;
}
</style>

<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue";
import '@/assets/css/admin-styles.css'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>


<template>
  <div v-if="modelValue" class="modal" @click.self="$emit('update:modelValue', false)">
    <div class="modal-content">
      <slot name="title">
        <h2 class="modal-title">상세 보기</h2>
      </slot>
      <slot />
      <div class="modal-buttons">
        <slot name="footer">
          <AdminButton type="secondary" @click="$emit('update:modelValue', false)">닫기</AdminButton>
        </slot>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>

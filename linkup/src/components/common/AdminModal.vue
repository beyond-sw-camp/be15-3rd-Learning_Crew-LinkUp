<script setup>
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
          <button class="btn btn-secondary" @click="$emit('update:modelValue', false)">닫기</button>
        </slot>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #e3e6ef;
  width: 700px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>

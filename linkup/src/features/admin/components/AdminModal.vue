<script setup>
import AdminButton from "@/features/admin/components/AdminButton.vue";

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


<style>
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

.modal-content img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.modal-body {
  display: flex;
  gap: 24px;
  margin-top: 20px;
}


.modal-left {
  justify-content: center;
  align-items: center;
}

.modal-left img {
  width: 240px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.modal-right {
  flex-direction: column;
  gap: 12px;
  padding-top: 10px;
}

.modal-label {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
}

.modal-select,
.modal-input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
}

.modal-footer,
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

</style>

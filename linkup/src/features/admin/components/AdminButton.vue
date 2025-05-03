<script setup>
defineProps({
  type: {
    type: String,
    default: 'default', // 'primary', 'secondary', 'approve', 'reject'
  }
})
</script>

<template>
  <button :class="['btn', `btn-${type}`]">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 6px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  cursor: pointer;
}

.btn-primary {
  background-color: #b7a6e4;
  color: #fff;
}

.btn-primary:hover {
  background-color: #a494d4;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #222;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-approve {
  background-color: #5790FF;
  color: #fff;
}

.btn-approve:hover {
  background-color: #88A0FF;
}

.btn-reject {
  background-color: #FE8A91;
  color: #fff;
}

.btn-reject:hover {
  background-color: #E75A61;
}

</style>

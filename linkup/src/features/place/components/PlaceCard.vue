<template>
  <div class="place-card" @click="$emit('click')">
    <img v-if="image" :src="image" :alt="title" />
    <div v-else class="placeholder-img" />

    <div class="place-info">
      <h3>{{ title }}</h3>
      <p>{{ address }}</p>
      <p>{{ price }}원/시간</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  address: String,
  price: String,
});
defineEmits(['click']);
</script>

<style scoped>
.place-card {
  @apply bg-white rounded-lg shadow p-3 flex flex-col overflow-hidden transition hover:-translate-y-1 cursor-pointer;
}

.place-card img {
  @apply w-full h-[160px] object-cover rounded-md;
}

.placeholder-img {
  @apply w-full h-[160px] bg-gray-200 rounded-md;
}

.place-info {
  @apply mt-2;
}

.place-info h3 {
  @apply font-semibold text-base mb-1;
}

.place-info p {
  @apply text-sm text-gray-600;
}
</style>
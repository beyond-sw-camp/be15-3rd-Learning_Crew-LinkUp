<template>
  <div class="container">
    <img src="https://cdn.pixabay.com/photo/2022/08/28/08/26/table-tennis-7415981_640.png" class="image"  alt="이미지"/>
    <main class="content">
      <header>
        <h1>{{ title }}</h1>
        <p class="subinfo">{{ address }}</p>
      </header>

      <slot name="description" />
      <hr />

      <slot name="details" />

      <hr />
      <slot name="extra" />
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  address: String,
  image: String,
});
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
.container {
  max-width: 900px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.content {
  padding: 24px;
}

h1 {
  margin: 0;
  font-size: 26px;
}

.subinfo {
  margin: 10px 0;
  font-size: 14px;
  color: #888;
}

.desc {
  margin: 20px 0;
  font-size: 16px;
  color: #333;
}

.button {
  width: 100%;
  margin-top: 30px;
  padding: 15px;
  background: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 30px 0;
}

.section {
  margin-top: 30px;
}

.section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
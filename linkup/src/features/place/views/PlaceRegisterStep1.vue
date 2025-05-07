<template>
  <main class="register-page">
    <div class="step-indicator">
      <div class="step active">1. 기본 정보 입력</div>
      <div class="line"></div>
      <div class="step">2. 운영 정보 입력</div>
    </div>

    <h1 class="page-title">장소 등록 - 기본 정보</h1>

    <section class="form-section">
      <form @submit.prevent="goToNextStep">
        <div class="form-group">
          <label for="name">장소 이름</label>
          <input type="text" id="name" v-model="place.placeName" placeholder="장소명을 입력하세요" required />
        </div>

        <div class="form-group">
          <label for="address">주소</label>
          <input
            type="text"
            id="address"
            v-model="place.address"
            placeholder="주소를 검색하세요"
            readonly
            @click="openDaumPostcode"
          />
        </div>

        <div class="form-group">
          <label for="sportId">운동 종목</label>
          <select id="sportId" v-model.number="place.sportId" required>
            <option disabled value="">선택하세요</option>
            <option value="0">기타 운동</option>
            <option value="1">풋살</option>
            <option value="2">테니스</option>
            <option value="3">볼링</option>
            <option value="4">탁구</option>
            <option value="5">농구</option>
            <option value="6">골프</option>
            <option value="7">배드민턴</option>
          </select>
        </div>

        <div class="form-group">
          <label for="price">가격 (원)</label>
          <input type="number" id="price" v-model.number="place.rentalCost" placeholder="1회 이용 가격을 입력하세요" required />
        </div>

        <div class="form-group">
          <label for="minParticipants">최소 인원</label>
          <input type="number" id="minParticipants" v-model.number="place.minUser" placeholder="최소 인원을 입력하세요" required />
        </div>

        <div class="form-group">
          <label for="maxParticipants">최대 인원</label>
          <input type="number" id="maxParticipants" v-model.number="place.maxUser" placeholder="최대 인원을 입력하세요" required />
        </div>

        <div class="form-group">
          <label for="description">장소 설명</label>
          <textarea id="description" v-model="place.description" rows="5" placeholder="장소에 대한 설명을 입력하세요"></textarea>
        </div>

        <div class="form-group">
          <label>장소 대표 이미지</label>
          <div class="image-upload-wrapper" id="imageWrapper">
            <div
              v-for="(img, index) in imagePreviews"
              :key="index"
              class="image-preview"
            >
              <img :src="img" alt="미리보기" />
            </div>
            <label class="upload-card">
              <span>＋</span>
              <input type="file" multiple class="hidden-input" @change="handleImageUpload" accept="image/*" />
            </label>
          </div>
        </div>

        <button type="submit" class="next-btn">다음 단계로 ➔</button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { saveBasicPlaceInfo } from '@/api/place';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const place = ref({
  ownerId: authStore.userId,
  sportId: '',
  placeName: '',
  address: '',
  description: '',
  minUser: 1,
  maxUser: 10,
  rentalCost: 0,
  isActive: 'Y',
});

const images = ref([]);
const imagePreviews = ref([]);

const handleImageUpload = (event) => {
  const files = event.target.files;
  for (let file of files) {
    images.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => imagePreviews.value.push(e.target.result);
    reader.readAsDataURL(file);
  }
};

const openDaumPostcode = () => {
  if (typeof window.daum === 'undefined') {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          place.value.address = data.roadAddress || data.jibunAddress;
        },
      }).open();
    };
    document.body.appendChild(script);
  } else {
    new window.daum.Postcode({
      oncomplete: (data) => {
        place.value.address = data.roadAddress || data.jibunAddress;
      },
    }).open();
  }
};

const goToNextStep = () => {
  saveBasicPlaceInfo(place.value, images.value);
  router.push('/place/register/step2');
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
body {
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  background-color: #f1f3fc;
  color: #1a1a1a;
}
.register-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px;
}
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}
.step {
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b7280;
}
.step.active {
  color: #5790ff;
}
.line {
  flex-grow: 1;
  height: 2px;
  background-color: #e6e6e6;
  margin: 0 8px;
}
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 36px;
  text-align: center;
}
.form-section {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.form-group {
  margin-bottom: 24px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.95rem;
}
input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
}
textarea {
  resize: vertical;
}
.image-upload-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.image-preview, .upload-card {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s, border-color 0.3s;
}
.upload-card{
  border: 2px dashed #d1d5db;
}
.image-preview{
  border: 2px dashed #5790ff;
}
.upload-card:hover {
  background-color: #f0f4ff;
  border-color: #5790ff;
}
.upload-card span {
  font-size: 2rem;
  color: #6b7280;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.hidden-input {
  display: none;
}
.next-btn {
  margin-top: 32px;
  width: 100%;
  background-color: #5790ff;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
.next-btn:hover {
  background-color: #365ec9;
}
</style>

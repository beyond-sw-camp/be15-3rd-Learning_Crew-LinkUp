<template>
  <div v-if="detail" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white w-[90%] max-w-2xl rounded-lg overflow-hidden shadow-lg max-h-[90vh] overflow-y-auto">
      <!-- 상단 이미지 -->
      <img
        :src="imageSrc"
        @error="onImageError"
        alt="장소 이미지"
        class="w-full h-64 object-cover"
      />

      <div class="p-6">
        <!-- 기본 정보 -->
        <h1 class="text-2xl font-bold">{{ detail.placeName }}</h1>
        <div class="text-sm text-gray-500 mt-1">
          {{ detail.address }} | 대여비: {{ detail.rentalCost.toLocaleString() }}원
        </div>

        <div class="text-base text-gray-700 mt-4">
          {{ detail.description }}
          <br />
          <strong>비치 장비:</strong> {{ detail.equipment }}
        </div>

        <hr class="my-6" />

        <!-- 운영 시간 -->
        <section class="mt-4">
          <h2 class="text-lg font-semibold mb-2">운영 시간</h2>
          <ul class="text-sm text-gray-700">
            <li v-for="(ot, index) in detail.operationTimes" :key="index">
              {{ dayKorMap[ot.dayOfWeek] || ot.dayOfWeek }}: {{ ot.startTime }} ~ {{ ot.endTime }}
            </li>
          </ul>
        </section>

        <hr class="my-6" />

        <!-- 장소 후기 -->
        <section class="mt-4">
          <h2 class="text-lg font-semibold mb-4">장소 후기</h2>

          <div
            v-for="(review, index) in detail.placeReviews"
            :key="index"
            class="flex justify-between bg-blue-50 p-4 rounded-lg shadow mb-4"
          >
            <div class="w-2/3">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-800">{{ review.nickname || '익명' }}</span>
                <div class="flex">
                  <img
                    v-for="n in 5"
                    :key="n"
                    :src="n <= review.reviewScore ? fullStar : emptyStar"
                    class="w-4 h-4"
                    alt="별점"
                  />
                </div>
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ review.reviewDate || '작성일 미상' }}</div>
              <p class="mt-2 text-sm text-gray-700">{{ review.reviewContent }}</p>
            </div>
            <div v-if="review.reviewImageUrl" class="w-1/3 flex items-center justify-center">
              <img :src="review.reviewImageUrl" class="w-full h-24 object-cover rounded" />
            </div>
          </div>
        </section>

        <!-- 버튼 -->
        <button class="mt-6 w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          예약하러 가기
        </button>

        <button class="mt-4 w-full py-2 text-sm text-gray-600" @click="emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getPlaceDetail } from '@/api/place';
import bgImage from '@/assets/images/linkup_bg.jpg'; // 기본 이미지

const emit = defineEmits(['close']);
const props = defineProps({ place: Object });

const detail = ref(null);
const imageSrc = ref(bgImage); // 초기값 기본 이미지

// 한글 요일 변환
const dayKorMap = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

// 별점 아이콘
const fullStar = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg';
const emptyStar = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg';

// 이미지 로드 실패 시 기본 이미지로 대체
function onImageError() {
  imageSrc.value = bgImage;
}

// 로컬 이미지 경로를 구성
function getLocalImage(placeId) {
  try {
    return new URL(`@/assets/images/place_${placeId}.jpg`, import.meta.url).href;
  } catch {
    return bgImage;
  }
}

// 장소 ID 변경 시 데이터 + 이미지 설정
watch(
  () => props.place?.placeId,
  async (id) => {
    if (!id) return;
    try {
      const { data } = await getPlaceDetail(id);
      detail.value = data.data;

      imageSrc.value = getLocalImage(id);
    } catch (error) {
      console.error('[장소 상세 조회 실패]', error);
    }
  },
  { immediate: true }
);
</script>

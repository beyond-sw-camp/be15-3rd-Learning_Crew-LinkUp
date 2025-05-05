<!--
<template>
  <div class="community-container">
    &lt;!&ndash; 검색 + 글쓰기 &ndash;&gt;
    <div class="search-write-container">
      <div class="search-container">
        <select v-model="searchType">
          <option value="all">제목+본문</option>
          <option value="title">제목</option>
          <option value="content">본문</option>
        </select>
        <input v-model="searchKeyword" type="text" placeholder="검색어를 입력하세요" />
        <button @click="searchPosts">검색</button>
      </div>
      <button class="write-button" @click="goToWrite">✏️ 글쓰기</button>
    </div>

    &lt;!&ndash; 게시글 목록 &ndash;&gt;
    <div id="postContainer">
      &lt;!&ndash; 공지사항 &ndash;&gt;
      <div
          class="post notice-post"
          v-for="post in noticePosts"
          :key="'notice-' + post.postId"
          @click.prevent="goToDetail(post.postId)"
      >
        <div class="post-content">
          <div class="post-title">📢 {{ post.title }}</div>
          <div class="post-text">{{ post.content }}</div>
          <div class="post-footer">
            <span>{{ formatDate(post.createdAt) }}</span>
          </div>
        </div>
      </div>

      &lt;!&ndash; 일반 게시글 &ndash;&gt;
      <a
          class="post"
          v-for="post in generalPosts"
          :key="'post-' + post.postId"
          @click.prevent="goToDetail(post.postId)"
      >
        <img :src="post.thumbnail || defaultThumbnail" class="thumbnail" alt="썸네일" />
        <div class="post-content">
          <div>
            <div class="post-title">{{ post.title }}</div>
            <div class="post-text">{{ post.content }}</div>
          </div>
          <div class="post-footer">
            <span>{{ formatDate(post.createdAt) }}</span>
            <div class="likes">
              ❤️ <span>{{ post.likeCount ?? 0 }}</span>
              💬 <span>{{ post.commentCount ?? 0 }}</span>
            </div>
          </div>
        </div>
      </a>

      &lt;!&ndash; 더보기 &ndash;&gt;
      <div class="load-more" ref="loadTrigger">
        <p v-if="isLoading">불러오는 중...</p>
        <p v-else-if="isLastPage">마지막 게시글입니다.</p>
        <p v-else>스크롤을 내려 더 많은 글을 확인하세요...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchPosts } from '@/features/community/communityApi';

const allPosts = ref([]);
const page = ref(1);
const size = 10;
const isLoading = ref(false);
const isLastPage = ref(false);
const loadTrigger = ref(null);

const router = useRouter();

const formatDate = (dateStr) => {
  return new Date(dateStr).toISOString().split('T')[0];
};

const goToWrite = () => {
  router.push('/community/write');
};

const goToDetail = (id) => {
  router.push(`/community/${id}`);
};

const loadPosts = async () => {
  if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;
  try {
    const response = await fetchPosts(page.value, size);
    const { posts: newPosts, pagination } = response.data.data;

    allPosts.value.push(...newPosts);
    isLastPage.value = pagination.totalPage === page.value;
    page.value++;
  } catch (err) {
    console.error('게시글 불러오기 실패:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPosts();

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadPosts();
    }
  }, { threshold: 0.5 });

  if (loadTrigger.value) observer.observe(loadTrigger.value);
});
</script>


<style scoped>
@import '@/assets/css/community-list.css';
</style>
-->
<template>
  <div class="community-container">
    <!-- 검색 + 글쓰기 -->
    <div class="search-write-container">
      <div class="search-container">
        <select v-model="searchType">
          <option value="all">제목+본문</option>
          <option value="title">제목</option>
          <option value="content">본문</option>
        </select>
        <input v-model="searchKeyword" type="text" placeholder="검색어를 입력하세요" />
        <button @click="searchPosts">검색</button>
      </div>
      <button class="write-button" @click="goToWrite">✏️ 글쓰기</button>
    </div>

    <!-- 게시글 목록 -->
    <div id="postContainer">
      <CommunityPostCard
          v-for="post in allPosts"
          :key="post.postId"
          :post="post"
          @click="goToDetail(post.postId)"
      />
      <div class="load-more" ref="loadTrigger">
        <p v-if="isLoading">불러오는 중...</p>
        <p v-else-if="isLastPage">마지막 게시글입니다.</p>
        <p v-else>스크롤을 내려 더 많은 글을 확인하세요...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {fetchPosts} from '@/features/community/communityApi';
import CommunityPostCard from '@/features/community/components/CommunityPostCard.vue';

const allPosts = ref([]);
const page = ref(1);
const size = 10;
const isLoading = ref(false);
const isLastPage = ref(false);
const loadTrigger = ref(null);

const searchType = ref('all');
const searchKeyword = ref('');
const router = useRouter();

const loadPosts = async () => {
  if (isLoading.value || isLastPage.value) return;
  isLoading.value = true;
  try {
    const response = await fetchPosts(page.value, size);
    const { posts: newPosts, pagination } = response.data.data;

    allPosts.value.push(...newPosts);
    isLastPage.value = pagination.totalPage === page.value;
    page.value++;
  } catch (err) {
    console.error('게시글 불러오기 실패:', err);
  } finally {
    isLoading.value = false;
  }
};

const searchPosts = () => {
  alert(`검색 기능은 추후 구현 (타입: ${searchType.value}, 키워드: ${searchKeyword.value})`);
};

const goToWrite = () => {
  router.push('/community/write');
};

const goToDetail = (id) => {
  router.push(`/community/${id}`);
};

onMounted(() => {
  loadPosts();
  const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadPosts();
        }
      },
      { threshold: 0.5 },
  );
  if (loadTrigger.value) observer.observe(loadTrigger.value);
});
</script>

<style scoped>
@import '@/assets/css/community-list.css';
</style>

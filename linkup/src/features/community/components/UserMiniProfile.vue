<template>
  <div class="mini-profile" :style="style" ref="profileRef" @click.stop>
    <button class="close-btn" @click="$emit('close')">×</button>
    <div class="profile-header">
      <img :src="user.profileImageUrl || defaultImage" class="avatar" alt="프로필" />
      <div class="user-info">
        <div class="nickname">{{ user.nickname }}</div>
        <div class="email">{{ user.user?.email }}</div>
      </div>
    </div>
    <div class="intro">{{ user.introduction || '자기소개가 없습니다.' }}</div>
    <div class="details">
      <span
        >🎯 매너온도: <strong>{{ user.mannerTemperature }}℃</strong></span
      >
    </div>
    <button class="add-friend" @click="handleFriendRequest">+ 친구 추가</button>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {getUserProfile, sendFriendRequest} from '@/api/user.js'; // 인증 정보

const props = defineProps({
  user: Object,
  position: Object,
});

const emit = defineEmits(['close']);

const defaultImage = '/default-profile.png';
const profileRef = ref(null);
const auth = useAuthStore();

const style = computed(() => ({
  position: 'absolute',
  top: `${props.position.y + 10}px`,
  left: `${props.position.x + 10}px`,
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  padding: '16px',
  width: '260px',
  zIndex: 999,
}));


const handleFriendRequest = async () => {
  const targetId = props.user?.user.userId;


  if (!targetId || targetId <= 0) {
    alert('유효하지 않은 대상 유저입니다.');
    return;
  }

  try {
    await sendFriendRequest(targetId);
  } catch (e) {
    console.error('친구 요청 실패', e);
  }
};


const handleClickOutside = (event) => {
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style scoped>
.mini-profile {
  font-family: 'Apple SD Gothic Neo', sans-serif;
  box-sizing: border-box;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 6px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #aaa;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #444;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #d2e1ff;
}
.user-info {
  margin-left: 12px;
}
.nickname {
  font-weight: bold;
  font-size: 1.1rem;
}
.email {
  font-size: 0.85rem;
  color: #888;
}

.intro {
  font-size: 0.9rem;
  color: #333;
  margin: 12px 0;
  background-color: #f5f7ff;
  padding: 8px;
  border-radius: 6px;
}

.details {
  font-size: 0.85rem;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.add-friend {
  width: 100%;
  padding: 8px 12px;
  background-color: #677eff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.add-friend:hover {
  background-color: #3f56dd;
}
</style>

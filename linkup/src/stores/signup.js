// stores/signupFormStore.ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useSignupFormStore = defineStore('signupForm', () => {
  const form = reactive({
    termsOfServiceAgreed: false, // 이용약관 동의 (필수)
    privacyPolicyAgreed: false, // 개인정보 처리방침 동의 (필수)
    marketingAgreed: false, // 마케팅 수신 동의 (선택)
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    //회원전용
    gender: '',
    nickname: '',
    birthDate: '',
    introduction: '',
    desiredSports: '',
    profileImageUrl: '',
    // 사업자 전용
    businessRegistrationDocumentUrl: '',
    companyName: '',
  });

  return { form };
});

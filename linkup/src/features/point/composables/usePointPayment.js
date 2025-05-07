import { useAuthStore } from '@/stores/auth.js';
import api from "@/api/axios.js";

export function usePointPayment() {
    const userStore = useAuthStore();

    const confirmPointPayment = async ({ amount, orderId, paymentKey }) => {
        try {
            const response = await api.post(
                '/user-service/payments/confirm', // ✅ 실제 API 경로
                { amount, orderId, paymentKey },
                {
                    headers: {
                        'Authorization': `Bearer ${userStore.accessToken}`
                    }
                }
            );

            console.log('✅ 포인트 충전 완료');
            return true;
        } catch (err) {
            console.error('❌ 통신 에러:', err);
            return false;
        }
    };

    return {
        confirmPointPayment
    };
}
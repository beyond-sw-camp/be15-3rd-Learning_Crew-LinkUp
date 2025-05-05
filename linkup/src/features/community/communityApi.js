import api from '@/api/axios.js';

// 게시글 목록 불러오기 (페이징)
export const fetchPosts = (page, size) => {
    return api.get(`/posts?page=${page}&size=${size}`);
};
const fetchPostById = (id) => api.get(`/posts/${id}`);

const createComment = (postId, commentContent) => {
    return api.post(`/posts/${postId}/comments`, {
        commentContent
    });
};

api.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ2NDMyMTIxLCJleHAiOjE3NDY0MzM5MjF9.txPUoamCuGkx9Q9jZzB07dkWBS-A_SNJ4O0AzfVC6icN6I0jtW-URz-6101Lwr1qwKNdaIetK2XVm7Ng-_434g';


export default {
    fetchPosts,
    fetchPostById,
    createComment,
};
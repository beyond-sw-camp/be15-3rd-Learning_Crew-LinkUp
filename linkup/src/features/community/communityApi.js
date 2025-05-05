import api from '@/api/axios.js';

// 게시글 목록 불러오기 (페이징)
export const fetchPosts = (page, size) => {
    return api.get(`/common-service/posts?page=${page}&size=${size}`);
};
const fetchPostById = (id) => api.get(`/common-service/posts/${id}`);

const createComment = (postId, commentContent, userId) => {
    return api.post(`/common-service/posts/${postId}/comments`, {
        commentContent,
        userId,
    });
};


export default {
    fetchPosts,
    fetchPostById,
    createComment,
};
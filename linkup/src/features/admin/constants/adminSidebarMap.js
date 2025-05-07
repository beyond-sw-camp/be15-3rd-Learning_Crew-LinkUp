// src/features/admin/constants/sidebar.js

export const adminSidebarMap = {
  '/admin/users': [
    { label: '회원 목록 조회', path: '/admin/users/members' },
    { label: '권한 요청 목록', path: '/admin/users/authorities' },
    { label: '게시글 내역 조회', path: '/admin/users/posts' },
    { label: '댓글 내역 조회', path: '/admin/users/comments' }
  ],
  '/admin/point': [
    { label: '포인트 내역 조회', path: '/admin/points/points' },
    { label: '정산 내역 조회', path: '/admin/points/settlement' },
    { label: '계좌 목록 조회', path: '/admin/points/accounts' }
  ],
  '/admin/place': [
    { label: '장소 목록 조회', path: '/admin/places/list' },
    { label: '장소 후기 조회', path: '/admin/places/reviews' }
  ],
  '/admin/meeting': [
    { label: '모임 목록 조회', path: '/admin/meetings/list' },
    { label: '참가자 평가 내역', path: '/admin/meetings/reviews' }
  ],
  '/admin/report': [
    { label: '신고 목록 조회', path: '/admin/reports/list' },
    { label: '신고 대상별 내역', path: '/admin/reports/targets' },
    { label: '신고자 목록 조회', path: '/admin/reports/reporters' },
    { label: '피신고자 목록 조회', path: '/admin/reports/reportees' }
  ],
  '/admin/penalties': [
    { label: '제재 내역 조회', path: '/admin/penalties/list' },
    { label: '이의 제기 내역 조회', path: '/admin/penalties/objections' },
    { label: '블랙리스트 조회', path: '/admin/penalties/blacklist' }
  ]
}

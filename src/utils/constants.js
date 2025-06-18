
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8080';


export const API_ENDPOINTS = {

    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        PROFILE: '/auth/profile'
    },


    USERS: {
        BASE: '/api/users',
        PROFILE: (id) => `/api/users/${id}`,
        SEARCH: '/api/users/search',
        CHECK_EMAIL: (email) => `/api/users/check-email/${email}`,
        CHECK_NICKNAME: (nickname) => `/api/users/check-nickname/${nickname}`,
        BY_TECH_STACK: (techStack) => `/api/users/tech-stack/${techStack}`
    },


    TECH_CATEGORIES: {
        BASE: '/api/tech-categories',
        BY_ID: (id) => `/api/tech-categories/${id}`,
        BY_TYPE: (type) => `/api/tech-categories/type/${type}`
    },


    CHAT_ROOMS: {
        BASE: '/api/chat-rooms',
        BY_ID: (id) => `/api/chat-rooms/${id}`,
        BY_TYPE: (type) => `/api/chat-rooms/type/${type}`
    },


    CHAT_PARTICIPANTS: {
        JOIN: '/api/chat-participants/join',
        LEAVE: '/api/chat-participants/leave',
        USER_ROOMS: (userId) => `/api/chat-participants/user/${userId}/rooms`,
        READ_MESSAGE: '/api/chat-participants/read-message',
        CHECK: '/api/chat-participants/check'
    },


    GROUP_MESSAGES: {
        TEXT: '/api/group-messages/text',
        FILE: '/api/group-messages/file',
        REPLY: '/api/group-messages/reply',
        ROOM_MESSAGES: (roomId) => `/api/group-messages/room/${roomId}`,
        BY_ID: (id) => `/api/group-messages/${id}`,
        RECENT: (roomId) => `/api/group-messages/room/${roomId}/recent`,
        STATS: (roomId) => `/api/group-messages/room/${roomId}/stats`
    },


    DIRECT_MESSAGES: {
        TEXT: '/api/direct-messages/text',
        FILE: '/api/direct-messages/file',
        CONVERSATION: '/api/direct-messages/conversation',
        UNREAD: (userId) => `/api/direct-messages/unread/${userId}`,
        UNREAD_COUNT: (userId) => `/api/direct-messages/unread-count/${userId}`,
        MARK_READ: (messageId) => `/api/direct-messages/mark-read/${messageId}`,
        PARTNERS: (userId) => `/api/direct-messages/partners/${userId}`,
        LAST_MESSAGE: '/api/direct-messages/last-message',
        MARK_ALL_READ: '/api/direct-messages/mark-all-read',
        SEARCH: '/api/direct-messages/search'
    },


    MESSAGE_REACTIONS: {
        ADD: '/api/message-reactions/add',
        REMOVE: '/api/message-reactions/remove',
        MESSAGE_REACTIONS: (messageId) => `/api/message-reactions/message/${messageId}`,
        STATS: (messageId) => `/api/message-reactions/message/${messageId}/stats`,
        USERS_BY_TYPE: (messageId, type) => `/api/message-reactions/message/${messageId}/users/${type}`,
        USER_REACTIONS: (userId, messageId) => `/api/message-reactions/user/${userId}/message/${messageId}`,
        CHECK: '/api/message-reactions/check',
        POPULAR: (messageId) => `/api/message-reactions/message/${messageId}/popular`,
        REMOVE_ALL: (messageId) => `/api/message-reactions/message/${messageId}/all`,
        TYPES: '/api/message-reactions/types',
        TOGGLE: '/api/message-reactions/toggle'
    }
};


export const CAREER_LEVELS = {
    JUNIOR: 'JUNIOR',
    MIDDLE: 'MIDDLE',
    SENIOR: 'SENIOR',
    LEAD: 'LEAD',
    PRINCIPAL: 'PRINCIPAL'
};

export const CAREER_LEVEL_LABELS = {
    [CAREER_LEVELS.JUNIOR]: '주니어',
    [CAREER_LEVELS.MIDDLE]: '미들',
    [CAREER_LEVELS.SENIOR]: '시니어',
    [CAREER_LEVELS.LEAD]: '리드',
    [CAREER_LEVELS.PRINCIPAL]: '프린시펄'
};


export const ROOM_TYPES = {
    TECH: 'TECH',
    TEAM_BUILDING: 'TEAM_BUILDING',
    JOB_INFO: 'JOB_INFO',
    FREE_TALK: 'FREE_TALK',
    QNA: 'QNA',
    PROJECT: 'PROJECT',
    STUDY: 'STUDY'
};

export const ROOM_TYPE_LABELS = {
    [ROOM_TYPES.TECH]: '기술 토론',
    [ROOM_TYPES.TEAM_BUILDING]: '팀 빌딩',
    [ROOM_TYPES.JOB_INFO]: '취업 정보',
    [ROOM_TYPES.FREE_TALK]: '자유 토론',
    [ROOM_TYPES.QNA]: 'Q&A',
    [ROOM_TYPES.PROJECT]: '프로젝트',
    [ROOM_TYPES.STUDY]: '스터디'
};


export const CATEGORY_TYPES = {
    LANGUAGE: 'LANGUAGE',
    FRAMEWORK: 'FRAMEWORK',
    LIBRARY: 'LIBRARY',
    TOOL: 'TOOL',
    DATABASE: 'DATABASE',
    CLOUD: 'CLOUD',
    MOBILE: 'MOBILE',
    OTHER: 'OTHER'
};

export const CATEGORY_TYPE_LABELS = {
    [CATEGORY_TYPES.LANGUAGE]: '프로그래밍 언어',
    [CATEGORY_TYPES.FRAMEWORK]: '프레임워크',
    [CATEGORY_TYPES.LIBRARY]: '라이브러리',
    [CATEGORY_TYPES.TOOL]: '도구',
    [CATEGORY_TYPES.DATABASE]: '데이터베이스',
    [CATEGORY_TYPES.CLOUD]: '클라우드',
    [CATEGORY_TYPES.MOBILE]: '모바일',
    [CATEGORY_TYPES.OTHER]: '기타'
};


export const REACTION_TYPES = {
    LIKE: 'LIKE',
    LOVE: 'LOVE',
    LAUGH: 'LAUGH',
    THUMBS_UP: 'THUMBS_UP',
    THUMBS_DOWN: 'THUMBS_DOWN',
    FIRE: 'FIRE',
    HEART: 'HEART',
    ROCKET: 'ROCKET'
};

export const REACTION_EMOJIS = {
    [REACTION_TYPES.LIKE]: '👍',
    [REACTION_TYPES.LOVE]: '❤️',
    [REACTION_TYPES.LAUGH]: '😂',
    [REACTION_TYPES.THUMBS_UP]: '👍',
    [REACTION_TYPES.THUMBS_DOWN]: '👎',
    [REACTION_TYPES.FIRE]: '🔥',
    [REACTION_TYPES.HEART]: '💖',
    [REACTION_TYPES.ROCKET]: '🚀'
};

export const NOTIFICATION_TYPES = {
    MESSAGE: 'MESSAGE',
    MENTION: 'MENTION',
    DM: 'DM',
    SYSTEM: 'SYSTEM',
    ROOM_INVITE: 'ROOM_INVITE',
    USER_JOIN: 'USER_JOIN',
    USER_LEAVE: 'USER_LEAVE',
    REACTION: 'REACTION'
};

export const QUESTION_TYPES = {
    TECH_QUESTION: 'TECH_QUESTION',
    INTERVIEW_PREP: 'INTERVIEW_PREP',
    CODE_REVIEW: 'CODE_REVIEW',
    CAREER_ADVICE: 'CAREER_ADVICE',
    PROJECT_HELP: 'PROJECT_HELP',
    GENERAL: 'GENERAL'
};

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'codify_auth_token',
    REFRESH_TOKEN: 'codify_refresh_token',
    USER_SETTINGS: 'codify_user_settings',
    THEME: 'codify_theme',
    SIDEBAR_STATE: 'codify_sidebar_state'
};

export const DEFAULT_SETTINGS = {
    THEME: 'light',
    SIDEBAR_OPEN: true,
    NOTIFICATIONS_ENABLED: true,
    SOUND_ENABLED: true,
    AUTO_SCROLL: true,
    MESSAGE_PAGE_SIZE: 20,
    DM_PAGE_SIZE: 20,
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    TYPING_INDICATOR_TIMEOUT: 3000,
    CONNECTION_RETRY_INTERVAL: 5000,
    MAX_RETRY_ATTEMPTS: 3
};


export const SUPPORTED_FILE_TYPES = {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ARCHIVE: ['application/zip', 'application/x-rar-compressed']
};


export const UI_CONSTANTS = {
    HEADER_HEIGHT: '64px',
    SIDEBAR_WIDTH: '280px',
    SIDEBAR_COLLAPSED_WIDTH: '72px',
    MESSAGE_INPUT_HEIGHT: '60px',
    TOAST_DURATION: 3000,
    MODAL_ANIMATION_DURATION: 200,
    TYPING_INDICATOR_HEIGHT: '24px'
};


export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    NICKNAME: /^[a-zA-Z0-9가-힣_-]{2,20}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    GITHUB_USERNAME: /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
};


export const ERROR_MESSAGES = {
    NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
    UNAUTHORIZED: '로그인이 필요합니다.',
    FORBIDDEN: '접근 권한이 없습니다.',
    NOT_FOUND: '요청하신 리소스를 찾을 수 없습니다.',
    SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    VALIDATION_ERROR: '입력 정보를 확인해주세요.',
    FILE_TOO_LARGE: '파일 크기가 너무 큽니다.',
    UNSUPPORTED_FILE_TYPE: '지원하지 않는 파일 형식입니다.',
    CONNECTION_FAILED: '연결에 실패했습니다.',
    MESSAGE_SEND_FAILED: '메시지 전송에 실패했습니다.',
    ROOM_JOIN_FAILED: '채팅방 입장에 실패했습니다.',
    ROOM_FULL: '채팅방이 가득 찼습니다.'
};


export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: '로그인 되었습니다.',
    LOGOUT_SUCCESS: '로그아웃 되었습니다.',
    REGISTER_SUCCESS: '회원가입이 완료되었습니다.',
    PROFILE_UPDATED: '프로필이 업데이트되었습니다.',
    MESSAGE_SENT: '메시지가 전송되었습니다.',
    FILE_UPLOADED: '파일이 업로드되었습니다.',
    ROOM_JOINED: '채팅방에 입장했습니다.',
    ROOM_LEFT: '채팅방에서 나갔습니다.',
    ROOM_CREATED: '채팅방이 생성되었습니다.',
    REACTION_ADDED: '반응이 추가되었습니다.',
    MESSAGE_COPIED: '메시지가 복사되었습니다.'
};
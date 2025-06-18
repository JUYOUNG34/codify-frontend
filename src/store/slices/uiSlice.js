import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../../utils/constants';

// 로컬 스토리지에서 설정 불러오기
const loadSettingsFromStorage = () => {
    try {
        const settings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
        return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
    } catch (error) {
        return DEFAULT_SETTINGS;
    }
};

// 로컬 스토리지에 설정 저장하기
const saveSettingsToStorage = (settings) => {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
    }
};

const initialState = {
    // 레이아웃 상태
    sidebarOpen: loadSettingsFromStorage().SIDEBAR_OPEN,
    sidebarCollapsed: false,

    // 테마
    theme: loadSettingsFromStorage().THEME,

    // 모달 상태
    modals: {
        profileModal: false,
        settingsModal: false,
        createRoomModal: false,
        inviteModal: false,
        filePreviewModal: false,
    },

    // 현재 활성 모달의 데이터
    modalData: null,

    // 알림 설정
    notifications: {
        enabled: loadSettingsFromStorage().NOTIFICATIONS_ENABLED,
        sound: loadSettingsFromStorage().SOUND_ENABLED,
        desktop: true,
    },

    // 채팅 설정
    chatSettings: {
        autoScroll: loadSettingsFromStorage().AUTO_SCROLL,
        showTypingIndicator: true,
        showOnlineStatus: true,
        messagePreview: true,
    },

    // 현재 연결 상태
    connectionStatus: 'disconnected', // 'connected', 'connecting', 'disconnected', 'error'

    // 로딩 상태들
    loading: {
        global: false,
        sidebar: false,
        messages: false,
    },

    // 에러 상태들
    errors: {
        connection: null,
        general: null,
    },

    // 검색 상태
    search: {
        query: '',
        isSearching: false,
        results: [],
    },

    // 현재 뷰 상태
    currentView: 'home', // 'home', 'chat', 'messages', 'profile'

    // 브레드크럼
    breadcrumb: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // 사이드바 관리
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
            const newSettings = { ...loadSettingsFromStorage(), SIDEBAR_OPEN: state.sidebarOpen };
            saveSettingsToStorage(newSettings);
        },

        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
            const newSettings = { ...loadSettingsFromStorage(), SIDEBAR_OPEN: action.payload };
            saveSettingsToStorage(newSettings);
        },

        toggleSidebarCollapsed: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },

        // 테마 관리
        setTheme: (state, action) => {
            state.theme = action.payload;
            const newSettings = { ...loadSettingsFromStorage(), THEME: action.payload };
            saveSettingsToStorage(newSettings);

            // HTML 클래스 업데이트 (다크모드 적용용)
            if (typeof document !== 'undefined') {
                if (action.payload === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        },

        toggleTheme: (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            const newSettings = { ...loadSettingsFromStorage(), THEME: newTheme };
            saveSettingsToStorage(newSettings);

            // HTML 클래스 업데이트
            if (typeof document !== 'undefined') {
                if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        },

        // 모달 관리
        openModal: (state, action) => {
            const { modalName, data = null } = action.payload;
            state.modals[modalName] = true;
            state.modalData = data;
        },

        closeModal: (state, action) => {
            const modalName = action.payload;
            state.modals[modalName] = false;
            if (!Object.values(state.modals).some(Boolean)) {
                state.modalData = null; // 모든 모달이 닫혔을 때만 데이터 클리어
            }
        },

        closeAllModals: (state) => {
            Object.keys(state.modals).forEach(key => {
                state.modals[key] = false;
            });
            state.modalData = null;
        },

        // 알림 설정 관리
        updateNotificationSettings: (state, action) => {
            state.notifications = { ...state.notifications, ...action.payload };
            const currentSettings = loadSettingsFromStorage();
            const newSettings = {
                ...currentSettings,
                NOTIFICATIONS_ENABLED: state.notifications.enabled,
                SOUND_ENABLED: state.notifications.sound,
            };
            saveSettingsToStorage(newSettings);
        },

        // 채팅 설정 관리
        updateChatSettings: (state, action) => {
            state.chatSettings = { ...state.chatSettings, ...action.payload };
            const currentSettings = loadSettingsFromStorage();
            const newSettings = {
                ...currentSettings,
                AUTO_SCROLL: state.chatSettings.autoScroll,
            };
            saveSettingsToStorage(newSettings);
        },

        // 연결 상태 관리
        setConnectionStatus: (state, action) => {
            state.connectionStatus = action.payload;
        },

        // 로딩 상태 관리
        setLoading: (state, action) => {
            const { type, value } = action.payload;
            state.loading[type] = value;
        },

        setGlobalLoading: (state, action) => {
            state.loading.global = action.payload;
        },

        // 에러 관리
        setError: (state, action) => {
            const { type, error } = action.payload;
            state.errors[type] = error;
        },

        clearError: (state, action) => {
            const type = action.payload;
            state.errors[type] = null;
        },

        clearAllErrors: (state) => {
            Object.keys(state.errors).forEach(key => {
                state.errors[key] = null;
            });
        },

        // 검색 관리
        setSearchQuery: (state, action) => {
            state.search.query = action.payload;
        },

        setSearching: (state, action) => {
            state.search.isSearching = action.payload;
        },

        setSearchResults: (state, action) => {
            state.search.results = action.payload;
        },

        clearSearch: (state) => {
            state.search.query = '';
            state.search.results = [];
            state.search.isSearching = false;
        },

        // 현재 뷰 관리
        setCurrentView: (state, action) => {
            state.currentView = action.payload;
        },

        // 브레드크럼 관리
        setBreadcrumb: (state, action) => {
            state.breadcrumb = action.payload;
        },

        addBreadcrumb: (state, action) => {
            state.breadcrumb.push(action.payload);
        },

        // UI 상태 초기화
        resetUIState: (state) => {
            state.modals = {
                profileModal: false,
                settingsModal: false,
                createRoomModal: false,
                inviteModal: false,
                filePreviewModal: false,
            };
            state.modalData = null;
            state.search = {
                query: '',
                isSearching: false,
                results: [],
            };
            state.breadcrumb = [];
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    toggleSidebarCollapsed,
    setTheme,
    toggleTheme,
    openModal,
    closeModal,
    closeAllModals,
    updateNotificationSettings,
    updateChatSettings,
    setConnectionStatus,
    setLoading,
    setGlobalLoading,
    setError,
    clearError,
    clearAllErrors,
    setSearchQuery,
    setSearching,
    setSearchResults,
    clearSearch,
    setCurrentView,
    setBreadcrumb,
    addBreadcrumb,
    resetUIState,
} = uiSlice.actions;

// 셀렉터들
export const selectUI = (state) => state.ui;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectTheme = (state) => state.ui.theme;
export const selectModals = (state) => state.ui.modals;
export const selectModalData = (state) => state.ui.modalData;
export const selectNotificationSettings = (state) => state.ui.notifications;
export const selectChatSettings = (state) => state.ui.chatSettings;
export const selectConnectionStatus = (state) => state.ui.connectionStatus;
export const selectLoading = (state) => state.ui.loading;
export const selectErrors = (state) => state.ui.errors;
export const selectSearch = (state) => state.ui.search;
export const selectCurrentView = (state) => state.ui.currentView;
export const selectBreadcrumb = (state) => state.ui.breadcrumb;

export default uiSlice.reducer;
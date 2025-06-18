import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 액션들
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            // TODO: API 호출 구현
            return [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '사용자 목록을 불러오는데 실패했습니다.');
        }
    }
);

export const searchUsers = createAsyncThunk(
    'user/searchUsers',
    async (keyword, { rejectWithValue }) => {
        try {
            // TODO: API 호출 구현
            return [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '사용자 검색에 실패했습니다.');
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            // TODO: API 호출 구현
            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '사용자 정보를 불러오는데 실패했습니다.');
        }
    }
);

const initialState = {
    // 사용자 목록
    users: [],
    searchResults: [],

    // 현재 보고 있는 사용자 프로필
    selectedUser: null,

    // DM 관련
    dmPartners: [], // DM 대화 상대방 목록

    // 차단 목록
    blockedUsers: [],

    // UI 상태
    loading: false,
    searchLoading: false,
    profileLoading: false,
    error: null,
    searchError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // 선택된 사용자 설정
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },

        // 사용자 목록 설정
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        // 검색 결과 설정
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },

        // 검색 결과 클리어
        clearSearchResults: (state) => {
            state.searchResults = [];
            state.searchError = null;
        },

        // DM 파트너 목록 설정
        setDmPartners: (state, action) => {
            state.dmPartners = action.payload;
        },

        // DM 파트너 추가
        addDmPartner: (state, action) => {
            const partner = action.payload;
            const exists = state.dmPartners.find(p => p.userId === partner.userId);
            if (!exists) {
                state.dmPartners.unshift(partner); // 최신 대화를 맨 위에
            }
        },

        // DM 파트너 업데이트 (최근 메시지 시간 등)
        updateDmPartner: (state, action) => {
            const { userId, updates } = action.payload;
            const partnerIndex = state.dmPartners.findIndex(p => p.userId === userId);
            if (partnerIndex !== -1) {
                state.dmPartners[partnerIndex] = { ...state.dmPartners[partnerIndex], ...updates };
                // 최근 대화를 맨 위로 이동
                const updatedPartner = state.dmPartners.splice(partnerIndex, 1)[0];
                state.dmPartners.unshift(updatedPartner);
            }
        },

        // 차단 사용자 목록 설정
        setBlockedUsers: (state, action) => {
            state.blockedUsers = action.payload;
        },

        // 사용자 차단
        blockUser: (state, action) => {
            const userId = action.payload;
            if (!state.blockedUsers.includes(userId)) {
                state.blockedUsers.push(userId);
            }
        },

        // 사용자 차단 해제
        unblockUser: (state, action) => {
            const userId = action.payload;
            state.blockedUsers = state.blockedUsers.filter(id => id !== userId);
        },

        // 에러 클리어
        clearError: (state) => {
            state.error = null;
        },

        clearSearchError: (state) => {
            state.searchError = null;
        },

        // 사용자 상태 초기화
        resetUserState: (state) => {
            state.selectedUser = null;
            state.searchResults = [];
            state.dmPartners = [];
        },
    },

    extraReducers: (builder) => {
        builder
            // 사용자 목록 가져오기
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 사용자 검색
            .addCase(searchUsers.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.payload;
            })

            // 사용자 프로필 가져오기
            .addCase(fetchUserProfile.pending, (state) => {
                state.profileLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.profileLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setSelectedUser,
    setUsers,
    setSearchResults,
    clearSearchResults,
    setDmPartners,
    addDmPartner,
    updateDmPartner,
    setBlockedUsers,
    blockUser,
    unblockUser,
    clearError,
    clearSearchError,
    resetUserState,
} = userSlice.actions;

// 셀렉터들
export const selectUser = (state) => state.user;
export const selectUsers = (state) => state.user.users;
export const selectSelectedUser = (state) => state.user.selectedUser;
export const selectSearchResults = (state) => state.user.searchResults;
export const selectDmPartners = (state) => state.user.dmPartners;
export const selectBlockedUsers = (state) => state.user.blockedUsers;
export const selectUserLoading = (state) => state.user.loading;
export const selectSearchLoading = (state) => state.user.searchLoading;
export const selectProfileLoading = (state) => state.user.profileLoading;
export const selectUserError = (state) => state.user.error;
export const selectSearchError = (state) => state.user.searchError;

export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api/auth';
import { STORAGE_KEYS } from '../../utils/constants';


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await authAPI.login({ email, password });
            const { user, token, refreshToken } = response.data;


            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

            return { user, token };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '로그인에 실패했습니다.');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.register(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '회원가입에 실패했습니다.');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logout();

            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_SETTINGS);

            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '로그아웃에 실패했습니다.');
        }
    }
);

export const loadUserFromToken = createAsyncThunk(
    'auth/loadUserFromToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
            if (!token) {
                throw new Error('No token found');
            }

            const response = await authAPI.getProfile();
            return { user: response.data, token };
        } catch (error) {
            // 토큰이 유효하지 않으면 제거
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            return rejectWithValue('인증 정보가 유효하지 않습니다.');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await authAPI.updateProfile(profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '프로필 업데이트에 실패했습니다.');
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
        updateUserData: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })

            .addCase(loadUserFromToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUserFromToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(loadUserFromToken.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.isInitialized = true;
                state.user = null;
                state.token = null;
            })


            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, setInitialized, updateUserData } = authSlice.actions;


export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsInitialized = (state) => state.auth.isInitialized;

export default authSlice.reducer;
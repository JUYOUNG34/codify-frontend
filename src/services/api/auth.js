import { apiRequest } from './index';
import { API_ENDPOINTS } from '../../utils/constants';

export const authAPI = {
    login: (credentials) => {
        return apiRequest.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    },

    register: (userData) => {
        return apiRequest.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    },

    logout: () => {
        return apiRequest.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    refreshToken: (refreshToken) => {
        return apiRequest.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
    },

    getProfile: () => {
        return apiRequest.get(API_ENDPOINTS.AUTH.PROFILE);
    },

    updateProfile: (profileData) => {
        return apiRequest.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
    },
};
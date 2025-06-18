import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS, ERROR_MESSAGES } from '../../utils/constants';
import { toast } from 'react-hot-toast';


const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
                if (refreshToken) {

                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refreshToken
                    });

                    const { accessToken } = response.data;
                    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);


                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        const errorMessage = getErrorMessage(error);
        if (error.response?.status !== 401) {
            toast.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

const getErrorMessage = (error) => {
    if (error.response?.data?.error) {
        return error.response.data.error;
    }

    switch (error.response?.status) {
        case 400:
            return ERROR_MESSAGES.VALIDATION_ERROR;
        case 401:
            return ERROR_MESSAGES.UNAUTHORIZED;
        case 403:
            return ERROR_MESSAGES.FORBIDDEN;
        case 404:
            return ERROR_MESSAGES.NOT_FOUND;
        case 500:
            return ERROR_MESSAGES.SERVER_ERROR;
        default:
            if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
                return ERROR_MESSAGES.NETWORK_ERROR;
            }
            return ERROR_MESSAGES.SERVER_ERROR;
    }
};

export const apiRequest = {
    get: (url, config = {}) => api.get(url, config),
    post: (url, data = {}, config = {}) => api.post(url, data, config),
    put: (url, data = {}, config = {}) => api.put(url, data, config),
    delete: (url, config = {}) => api.delete(url, config),
    patch: (url, data = {}, config = {}) => api.patch(url, data, config),
};

// 파일 업로드용 별도 함수
export const uploadFile = async (url, file, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
        };
    }

    return api.post(url, formData, config);
};


export const buildQueryParams = (params) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, value);
        }
    });

    return queryParams.toString();
};


export const createPaginationParams = (page = 0, size = 20, sortBy = 'createdAt', sortDir = 'desc') => {
    return {
        page,
        size,
        sort: `${sortBy},${sortDir}`
    };
};

export default api;
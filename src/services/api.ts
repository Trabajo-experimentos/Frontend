import axios, { AxiosError } from 'axios';

interface ApiErrorBody {
  message?: string;
  errors?: Array<{ field?: string; message?: string }>;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error('Request setup failed'))
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    const errorBody = error.response?.data;
    const validationMessage = errorBody?.errors
      ?.map((item) => [item.field, item.message].filter(Boolean).join(': '))
      .filter(Boolean)
      .join(', ');
    const message =
      validationMessage ||
      errorBody?.message ||
      error.message ||
      'Request failed';

    return Promise.reject(new Error(message));
  }
);

export default api;

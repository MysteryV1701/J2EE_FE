import Axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { paths } from '@/config/paths';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
  }
  const token = sessionStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        try {
          const refreshResponse = await api.post('/auth/refresh-token');
          const newAccessToken = refreshResponse.access_token;
          sessionStorage.setItem('access_token', newAccessToken);

          // Retry fetching the user data with the new token
          return await api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          sessionStorage.removeItem('access_token'); // Remove invalid token
        }
      } else {
        const searchParams = new URLSearchParams();
        const redirectTo =
          searchParams.get('redirectTo') || window.location.pathname;
        window.location.href = paths.auth.login.getHref(redirectTo);
      }
    }
    return Promise.reject(error);
  },
);

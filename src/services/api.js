import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// 🔥 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If no response or not 401 → just fail
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔐 CALL REFRESH TOKEN API
        console.log('🔄 Calling refresh API');

        const res = await axios.post('http://localhost:5000/api/refresh-token', {}, { withCredentials: true });

        console.log('✅ Refresh success:', res.data);

        return api(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token failed:', refreshError);

        // ❌ SAFE REDIRECT
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;

import api from '@/lib/api';

// csrf 토큰 요청
export const getCSRFToken = async () => {
  try {
    const { data } = await api.get('/auth/csrf-token');

    return data;
  } catch (error) {
    throw error;
  }
};

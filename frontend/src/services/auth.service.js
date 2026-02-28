import api from './api';

const authService = {
  login: async ({ email, password, googleToken }) => {
    if (googleToken) {
      const res = await api.post('/auth/google', { token: googleToken });
      return res.data;
    }
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },
  register: async ({ name, email, password }) => {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;

import api from './api'; // axios

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const { user } = res.data;

  return { user };
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};


export const logout = async () => {
  await api.post('/auth/logout');
};

export const fetchMe = async () => {
  const res = await api.get('/auth/me'); // backend returns user from cookie
  return { user: res.data.user };
};

export const forgotPassword = async (email) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

export const resetPassword = async (token, newPassword) => {
  const res = await api.post('/auth/reset-password', { token, newPassword });
  return res.data;
};
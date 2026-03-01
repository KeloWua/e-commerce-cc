import api, { setAuthToken } from './api'; // axios

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const { token, user } = res.data;
  setAuthToken(token);

  return { token, user };
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};


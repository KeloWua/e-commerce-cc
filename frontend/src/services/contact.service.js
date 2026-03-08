import api from './api.js';

export const sendContactForm = async (data) => {
  const res = await api.post('/contact', data);
  return res.data;
};
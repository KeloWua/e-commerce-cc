import api from './api';

const productService = {
  getAll: async () => {
    const res = await api.get('/products');
    return res.data;
  },
};

export default productService;

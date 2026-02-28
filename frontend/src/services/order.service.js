import api from './api';

const orderService = {
  getUserOrders: async userId => {
    const res = await api.get(`/orders/user/${userId}`);
    return res.data;
  },
};

export default orderService;

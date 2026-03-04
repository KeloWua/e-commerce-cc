import api from "./api";



export const fetchProducts = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const { data } = await api.get(`/products?${params}`);
  return data.products;
};

export const fetchProductById = async (productId) => {
    const { data } = await api.get(`/products/${productId}`);
    return data
  };
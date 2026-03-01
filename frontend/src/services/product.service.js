import api from "./api";

export const fetchProducts = async () => {
    const { data } = await api.get('/products');
    return data.products
};


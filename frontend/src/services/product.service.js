import api from "./api";

export const fetchProducts = async () => {
    const { data } = await api.get('/products');
    console.log(data.products)
    return data.products
};

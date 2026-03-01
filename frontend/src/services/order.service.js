import api from "./api";

export const fetchOrder = async () => {
    const data = await api.get('/orders/pending');
    if (!data) {return null}
    console.log(data.data);
    return data.data;
};



export const updateQtyProduct = async (productId, quantity) => {
    const data = await api.patch(`/orders/items/${productId}`, {quantity} )
}


export const fetchUserOrders = async () => {
    const { data } = await api.get('/orders/');
    if (!data) {return null}
    return data.orders;
};


export const fetchOrderById = async (orderId) => {
    const { data } = await api.get(`/orders/${orderId}`);
    if (!data) {return null}
    console.log(data);
    return data;
};

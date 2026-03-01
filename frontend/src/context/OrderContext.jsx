import { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const fetchPendingOrder = async () => {
    try {
      const res = await api.get('/orders/pending')
      setOrder(res.data);
    } catch (error) {
      setOrder(null)
    }   
  };

  const addItem = async (productId, quantity = 1) => {
    await api.post('/orders/items', {productId, quantity});
    await fetchPendingOrder();
  };

  const clearOrder = () => {
    setOrder(null);
  }

  useEffect(() => {
    fetchPendingOrder
  }, []);;


  return (
    <OrderContext.Provider value={{ order, addItem, fetchPendingOrder, clearOrder}}>
      {children}
    </OrderContext.Provider>
  );
};
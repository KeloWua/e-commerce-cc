import { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

export const productsContext = createContext();

export const productsProvider = ({ children }) => {
  const [products, setproducts] = useState(null);

  const fetchPendingproducts = async () => {
    try {
      const res = await api.get('/productss/pending')
      setproducts(res.data);
    } catch (error) {
      setproducts(null)
    }   
  };

  const addItem = async (productId, quantity = 1) => {
    await api.post('/productss/items', {productId, quantity});
    await fetchPendingproducts();
  };

  const clearproducts = () => {
    setproducts(null);
  }

  useEffect(() => {
    fetchPendingproducts
  }, []);;


  return (
    <productsContext.Provider value={{ products, addItem, fetchPendingproducts, clearproducts}}>
      {children}
    </productsContext.Provider>
  );
};
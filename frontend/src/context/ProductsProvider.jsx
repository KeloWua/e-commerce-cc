import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api.js";
import { OrderContext } from "./OrderContext.jsx";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { loadOrder } = useContext(OrderContext);
  const [products, setproducts] = useState(null);
  const fetchPendingproducts = async () => {
    try {
      const res = await api.get('/products')
      setproducts(res.data.products);
    } catch (error) {
      setproducts(null)
    }   
  };

  const addItem = async (productId, quantity = 1) => {
    await api.post('/orders/items', {productId, quantity});
    await fetchPendingproducts();
    await loadOrder();
  };

  const clearproducts = () => {
    setproducts(null);
  }

  useEffect(() => {
    fetchPendingproducts()
  }, []);;


  return (
    <ProductsContext.Provider value={{ products, addItem, fetchPendingproducts, clearproducts}}>
      {children}
    </ProductsContext.Provider>
  );
};
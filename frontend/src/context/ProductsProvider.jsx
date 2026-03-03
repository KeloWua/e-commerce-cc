import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api.js";
import { OrderContext } from "./OrderContext.jsx";
import { fetchProducts } from "../services/product.service.js";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { loadOrder } = useContext(OrderContext);
  const [products, setProducts] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    sort: "",
    page: 1,
    limit: 12,
  });

  const getProducts = async () => {
    try {

      const res = await fetchProducts(filters);
      setProducts(res);
    } catch (error) {
      setProducts([])
    }
  };

  const addItem = async (productId, quantity = 1) => {
    await api.post('/orders/items', { productId, quantity });
    await getProducts();
    await loadOrder();
  };

  const clearproducts = () => {
    setProducts([]);
  }

  useEffect(() => {
    getProducts()
  }, [filters]);;


  return (
    <ProductsContext.Provider value={{ products, filters, setFilters, addItem, getProducts, clearproducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
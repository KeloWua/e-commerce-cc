import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api.js";
import { OrderContext } from "./OrderContext.jsx";
import { fetchProducts, fetchProductById, fetchCategories } from "../services/product.service.js";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { loadOrder } = useContext(OrderContext);
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(null);
  const [categories, setCategories] = useState(null);
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

      const { products, total } = await fetchProducts(filters);
      setProducts(products);
      setTotal(total)
    } catch (error) {
      setProducts([])
    }
  };

  const getProductById = async (productId) => {
    try {
      const res = await fetchProductById(productId)
      return res
    } catch (error) {
      console.error(error)
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

  const getCategories = async () => {
    try {
      const { categories } = await fetchCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getProducts();
    getCategories();
  }, [filters]);;

  return (
    <ProductsContext.Provider value={{ products, filters, setFilters, categories,addItem, getProducts, getProductById, clearproducts, total }}>
      {children}
    </ProductsContext.Provider>
  );
};
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { ProductsContext } from "../context/ProductsContext";

export const useCart = () => {
  const { order } = useContext(OrderContext);
  const { addItem } = useContext(ProductsContext);

  const getItemQuantity = (productId) => {
    const item = (order?.items ?? []).find(
      (item) => item.product_id === productId
    );
    return item?.quantity ?? 0;
  };

  const isInCart = (productId) => {
    return (order?.items ?? []).some(
      (item) => item.product_id === productId
    );
  };

  const addToCart = async (productId, quantity = 1) => {
    await addItem(productId, quantity);
  };

  return {
    getItemQuantity,
    isInCart,
    addToCart,
  };
};
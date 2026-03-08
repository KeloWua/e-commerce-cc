import { createContext, useState, useEffect, useContext } from "react";
import {
  fetchUserOrders,
  fetchPendingOrder,
  updateQtyProduct,
  stripePayment
} from "../services/order.service";
import { AuthContext } from "./AuthContext";



export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Global state
  const [order, setOrder] = useState(null);
  const { user } = useContext(AuthContext);
  // Load pending order from backend
  const loadOrder = async () => {
    try {
      const data = await fetchPendingOrder();

      if (!data) {
        setOrder(null);
        return;
      }

      // Normalizing data to avoid issues with e.g(' .toFixed(2) '...)
      const normalized = {
        ...data,
        items: Array.isArray(data.items) ? data.items.map(item => ({
          ...item,
          price: Number(item.price),
          quantity: Number(item.quantity)
        })) : []
      };
      
      setOrder(normalized);

    } catch (error) {
      console.error("Error loading order:", error);
      setOrder(null);
    }
  };

  const getUserOrders = async () => {
    const data = await fetchUserOrders();
    return data;
  }


  // Update quantity
  const updateItemQty = async (productId, quantity) => {
    await updateQtyProduct(productId, quantity);

    // IMPORTANT:
    // After modifying backend, re-load updated order
    await loadOrder();
  };

  // Executes when provider mounts or user logs in/out.
  useEffect(() => {
    if (user) {
      loadOrder();
    } else {
      setOrder(null);
    }
  }, [user]);


  const stripePaymentCheckout = async () => {
    const stripeUrl = await stripePayment();
    return stripeUrl; //returns link to checkout with order
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        getUserOrders,
        loadOrder,
        updateItemQty,
        stripePaymentCheckout
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
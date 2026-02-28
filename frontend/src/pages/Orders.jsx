import React, { useEffect, useState, useContext } from 'react';
import orderService from '../services/order.service';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      orderService.getUserOrders(user.id).then(setOrders).catch(console.error);
    }
  }, [user]);

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(o => (
            <li key={o.id}>{o.createdAt}: ${o.total}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;

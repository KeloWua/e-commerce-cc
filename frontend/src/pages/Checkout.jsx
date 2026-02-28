import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {/* In a full implementation, integrate Stripe here */}
      <p>Items to purchase:</p>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} x {item.quantity}</li>
        ))}
      </ul>
      <button disabled={cartItems.length === 0}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;

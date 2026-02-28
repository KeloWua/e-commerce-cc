import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;

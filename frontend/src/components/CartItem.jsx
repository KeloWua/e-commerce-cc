import React from 'react';

const CartItem = ({ item, onRemove }) => {
  return (
    <li className="cart-item">
      {item.name} x {item.quantity} - ${item.price * item.quantity}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
};

export default CartItem;

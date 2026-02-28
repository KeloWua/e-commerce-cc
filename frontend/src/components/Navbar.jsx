import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      {user ? (
        <>
          <Link to="/orders">Orders</Link>
          <button onClick={logout}>Logout</button>
          <span className="user-name">{user.name}</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;

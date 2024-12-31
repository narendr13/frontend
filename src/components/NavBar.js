import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link styling

function NavBar() {
  const isLoggedIn = localStorage.getItem('authToken'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authentication token
    alert('You have logged out!');
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/products" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
            Products
          </NavLink>
          <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
            Cart
          </NavLink>
          <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
            Profile
          </NavLink>
          <button onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
            Login
          </NavLink>
          <NavLink to="/register" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;

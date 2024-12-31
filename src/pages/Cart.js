import React, { useEffect, useState } from 'react';
import { fetchCart, removeFromCart } from '../services/apiService';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadCart() {
      try {
        const items = await fetchCart();
        setCartItems(items);
        calculateTotal(items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
    loadCart();
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      const updatedCart = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
      ) : (
        <p>Your cart is currently empty.</p>
      )}
    </div>
  );
}

export default Cart;

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function getOrCreateGuestId() {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = "guest_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });
  const guestId = getOrCreateGuestId();

  // Fetch cart from backend on mount and when guestId changes
  useEffect(() => {
    axios.get("https://e-commerce-test-2-f4t8.onrender.com/api/cart", {
      params: { guestId },
      withCredentials: true,
    })
      .then(res => setCart(res.data.data || { cartItems: [] }))
      .catch(() => setCart({ cartItems: [] }));
  }, [guestId]);

  const addToCart = async (product) => {
    try {
      const res = await axios.post(
        "https://e-commerce-test-2-f4t8.onrender.com/api/cart/add",
        { productId: product._id, quantity: 1, guestId },
        { withCredentials: true }
      );
      setCart(res.data.data || { cartItems: [] });
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete("https://e-commerce-test-2-f4t8.onrender.com/api/cart/item", {
        data: { productId, guestId },
        withCredentials: true,
      });
      setCart(res.data.data || { cartItems: [] });
    } catch (err) {
      alert("Error removing from cart");
    }
  };

  // Update quantity of a cart item
  const updateCartItem = async (productId, quantity) => {
    try {
      const res = await axios.put(
        "https://e-commerce-test-2-f4t8.onrender.com/api/cart",
        { productId, quantity, guestId },
        { withCredentials: true }
      );
      setCart(res.data.data || { cartItems: [] });
    } catch (err) {
      alert("Error updating cart item");
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      const res = await axios.delete(
        "https://e-commerce-test-2-f4t8.onrender.com/api/cart/clear",
        {
          data: { guestId },
          withCredentials: true,
        }
      );
      setCart(res.data.data || { cartItems: [] });
    } catch (err) {
      alert("Error clearing cart");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}; 
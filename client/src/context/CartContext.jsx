import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addCartItem,
  removeCartItem,
  resetCart,
} from "../services/cartService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [, token] = useAuth();
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (token) {
      getCart()
        .then((data) => {
          setCart(data.products || []);
          setCartId(data._id);
        })
        .catch(() => {});
    } else {
      const local = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(local);
    }
  }, [token]);

  const addToCart = async (product, size) => {
    if (token) {
      const data = await addCartItem(cartId, product._id, size);
      setCart(data.products || []);
    } else {
      setCart((prev) => {
        const existing = prev.find(
          (i) => i.product._id === product._id && i.size === size
        );
        let updated;
        if (existing) {
          updated = prev.map((i) =>
            i.product._id === product._id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          updated = [...prev, { product, size, quantity: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (token) {
      const data = await removeCartItem(cartId, productId);
      setCart(data.products || []);
    } else {
      setCart((prev) => {
        const updated = prev.filter((i) => i.product._id !== productId);
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearCart = async () => {
    if (token && cartId) {
      await resetCart(cartId);
    }
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={[cart, addToCart, removeFromCart, clearCart, cartId]}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

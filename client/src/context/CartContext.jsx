import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCart, addCartItem, removeCartItem, resetCart } from "../services/cartService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [user] = useAuth();
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (user) {
      getCart().then(data => {
        setCartId(data._id);
        setCart(data.products || []);
      }).catch(console.error);
    } else {
      setCart([]);
      setCartId(null);
    }
  }, [user]);

  const addToCart = async (product, size, quantity = 1) => {
    if (user) {
      const updated = await addCartItem(cartId, product._id, size);
      setCart(updated.products || []);
    } else {
      setCart(prev => {
        const existing = prev.find(item => item.product._id === product._id && item.size === size);
        if (existing) {
          return prev.map(item =>
            item.product._id === product._id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, size, quantity }];
      });
    }
  };

  const removeFromCart = async (productId, size) => {
    if (user) {
      const updated = await removeCartItem(cartId, productId);
      setCart(updated.products || []);
    } else {
      setCart(prev => prev.filter(item => !(item.product._id === productId && item.size === size)));
    }
  };

  const clearCart = async () => {
    if (user) {
      await resetCart(cartId);
    }
    setCart([]);
  };

  return (
    <CartContext.Provider value={[cart, addToCart, removeFromCart, clearCart]}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

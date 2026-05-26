import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CarteProvier({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [Cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[user, Cart]}>{children}</CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

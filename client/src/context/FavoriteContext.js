import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvier({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoriteContext.Provider value={[user, favorites]}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoriteContext);

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getMyFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
} from "../services/favoriteService";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [user] = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.removeItem("favorites");
      getMyFavorites()
        .then((data) => setFavorites(data.products ?? []))
        .catch(() => setFavorites([]));
    } else {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(stored);
    }
  }, [user]);

  async function toggleFavorites(product) {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      const exists = stored.some((fav) => fav._id === product._id);
      const updated = exists
        ? stored.filter((fav) => fav._id !== product._id)
        : [...stored, product];

      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
      return;
    }

    const exists = favorites.some((fav) => fav._id === product._id);

    if (exists) {
      setFavorites(favorites.filter((fav) => fav._id !== product._id));
      try { await removeProductFromFavorites(product._id); } catch {}
    } else {
      setFavorites([...favorites, product]);
      try { await addProductToFavorites(product._id); } catch {}
    }
  }

  return (
    <FavoriteContext.Provider value={[toggleFavorites, favorites]}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoriteContext);

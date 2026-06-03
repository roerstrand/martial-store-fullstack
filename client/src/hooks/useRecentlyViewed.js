import { useState, useCallback } from "react";

const KEY = "apex_recently_viewed";
const MAX = 6;

function getStored() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [items, setItems] = useState(getStored);

  const addProduct = useCallback((product) => {
    setItems(prev => {
      const filtered = prev.filter(p => p._id !== product._id);
      const updated = [product, ...filtered].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { items, addProduct };
}

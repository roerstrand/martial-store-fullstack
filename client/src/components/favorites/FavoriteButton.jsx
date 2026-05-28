import { useFavorites } from "../../context/FavoriteContext";

export function FavoriteButton({ product }) {
  const [toggleFavorites, favorites] = useFavorites();

  const active = favorites.some((fav) => fav._id === product._id);

  return (
    <button onClick={() => toggleFavorites(product)}>
      <img
        src={active ? "/icons/FavoritesFilled.png" : "/icons/Favorites.png"}
      />
    </button>
  );
}

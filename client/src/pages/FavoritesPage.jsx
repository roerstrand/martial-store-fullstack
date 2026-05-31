import { useFavorites } from "../context/FavoriteContext";
import "./Pages.css";
import FavoriteItem from "../compoenents/favorites/FavoriteItem";

function FavoritesPage() {
  const [, favorites] = useFavorites();

  if (favorites.length === 0) {
    return <p>You have no favorites yet.</p>;
  }

  return (
    <div>
      {favorites.map((product) => {
        return <FavoriteItem key={product._id} product={product} />;
      })}
    </div>
  );
}

export default FavoritesPage;

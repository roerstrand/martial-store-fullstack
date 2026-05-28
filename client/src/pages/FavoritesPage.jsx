import { useFavorites } from "../context/FavoriteContext";
import "./Pages.css";

function FavoritesPage() {
  const [, favorites] = useFavorites();

  if (favorites.length === 0) {
    return <p>You have no favorites yet.</p>;
  }

  return (
    <div>
      pro
      {favorites.map((product) => {
        <div key={product._id}>
          <p>{product.title}</p>
        </div>;
      })}
    </div>
  );
}

export default FavoritesPage;

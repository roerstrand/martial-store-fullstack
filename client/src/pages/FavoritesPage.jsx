import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
import "./Pages.css";
import FavoriteItem from "../components/favorites/FavoriteItem";
import PageNav from "../components/PageNav";

function FavoritesPage() {
  const [, favorites] = useFavorites();

  return (
    <div className="favorites-page">
      <PageNav back="/" backLabel="Home" />
      <div className="favorites-header">
        <h1>Favorites</h1>
        {favorites.length > 0 && (
          <span className="favorites-count">{favorites.length} items</span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <span className="favorites-empty__icon">♡</span>
          <p>No favorites yet</p>
          <Link to="/products" className="auth-btn-secondary">BROWSE PRODUCTS ›</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <FavoriteItem key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="favorites-nav">
        <Link to="/products" className="auth-btn-secondary">ALL PRODUCTS ›</Link>
        <Link to="/" className="auth-btn-secondary">BACK TO HOME ›</Link>
      </div>
    </div>
  );
}

export default FavoritesPage;

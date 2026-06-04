import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";
import "../../pages/Pages.css";

function FavoriteToast() {
  const [,, toast] = useFavorites();
  if (!toast) return null;

  return (
    <div className="fav-toast">
      <span className="fav-toast__text">Added to favorites</span>
      <Link to="/favorites" className="fav-toast__link">View Favorites ›</Link>
    </div>
  );
}

export default FavoriteToast;

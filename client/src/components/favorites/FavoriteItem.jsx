import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";

function FavoriteItem({ product }) {
  const [toggleFavorites] = useFavorites();

  return (
    <div className="fav-card">
      <Link to={`/products/${product._id}`} className="fav-card__img-wrap">
        <img src={`/images/products/${product.image}`} alt={product.title} />
      </Link>
      <div className="fav-card__footer">
        <div className="fav-card__info">
          <span className="fav-card__name">{product.title}</span>
          <span className="fav-card__price">
            {product.price} <small>EUR</small>
          </span>
        </div>
        <button
          className="fav-card__remove"
          onClick={() => toggleFavorites(product)}
          title="Remove from favorites"
        >
          <img src="/icons/FavoritesFilled.png" alt="Remove" />
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;

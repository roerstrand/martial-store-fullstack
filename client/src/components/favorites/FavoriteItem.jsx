import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";
import { useCart } from "../../context/CartContext";

function FavoriteItem({ product }) {
  const [toggleFavorites] = useFavorites();
  const [, addToCart] = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

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
      <div className="fav-card__actions">
        <div className="fav-card__sizes">
          {["S", "M", "L"].map(size => (
            <button
              key={size}
              className={`fav-card__size-btn ${selectedSize === size ? "fav-card__size-btn--active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          className="fav-card__add-btn"
          onClick={() => selectedSize && addToCart(product, selectedSize)}
          disabled={!selectedSize}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;

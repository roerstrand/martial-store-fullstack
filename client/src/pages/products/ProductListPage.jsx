import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getProducts } from "../../services/productService";
import Filter, { DEFAULT_FILTERS } from "../../components/products/Filter";
import { useFavorites } from "../../context/FavoriteContext";
import { useCart } from "../../context/CartContext";
import "../Pages.css";

const CATEGORIES = ["all", "bjj", "boxing", "muaythai", "karate"];

function applyFilters(products, category, filters) {
  let result = category === "all"
    ? [...products]
    : products.filter((p) => p.category === category);

  if (filters.onSale)          result = result.filter((p) => p.sale > 0);
  if (filters.minPrice !== "") result = result.filter((p) => p.price >= Number(filters.minPrice));
  if (filters.maxPrice !== "") result = result.filter((p) => p.price <= Number(filters.maxPrice));
  if (filters.minRating > 0)  result = result.filter((p) => p.rating >= filters.minRating);

  if (filters.sort === "price-asc")   result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc")  result.sort((a, b) => b.price - a.price);
  if (filters.sort === "name-asc")    result.sort((a, b) => a.title.localeCompare(b.title));
  if (filters.sort === "rating-desc") result.sort((a, b) => b.rating - a.rating);

  return result;
}

function StarRating({ rating }) {
  return (
    <span className="product-card__stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`star${s <= rating ? " star--filled" : ""}`}>★</span>
      ))}
    </span>
  );
}

function ProductListPage() {
  const [toggleFavorites, favorites] = useFavorites();
  const [, addToCart] = useCart();
  const { data: products, loading, error } = useFetch(getProducts);
  const [category, setCategory] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error)   return <p className="loading">Could not load products</p>;

  const displayed = applyFilters(products, category, filters);

  return (
    <div className="products-page">

      <div className="products-toolbar">
        <h1>Our Fight Gear</h1>
        <button
          className="products-toolbar-btn"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "CLOSE ✕" : "FILTER ›"}
        </button>
      </div>

      <div className="products-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-pill${category === cat ? " category-pill--active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat === "all" ? "All" : cat === "muaythai" ? "Muay Thai" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {showFilter && (
        <Filter
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      <p className="products-count">{displayed.length} products</p>

      <div className="products-grid">
        {displayed.map((product) => {
          const isFav = favorites.some((f) => f._id === product._id);
          const discountedPrice = product.sale > 0
            ? Math.round(product.price * (1 - product.sale / 100))
            : null;

          return (
            <Link to={`/products/${product._id}`} key={product._id} className="product-card">
              <div className="product-card__img-wrap">
                <img src={`/images/products/${product.image}`} alt={product.title} />

                {product.sale > 0 && (
                  <span className="product-card__sale-badge">−{product.sale}%</span>
                )}

                <div className="product-card__overlay">
                  <span className="product-card__category-tag">
                    {product.category === "muaythai" ? "Muay Thai" : product.category.toUpperCase()}
                  </span>
                </div>

                <button
                  className="product-card__cart-btn"
                  onClick={(e) => { e.preventDefault(); addToCart(product, null); }}
                >
                  <img src="/icons/Cart add.svg" alt="Add to cart" />
                </button>
              </div>

              <div className="product-card__footer">
                <div className="product-card__info">
                  <span className="product-card__name">{product.title}</span>
                  <div className="product-card__price-row">
                    {discountedPrice ? (
                      <>
                        <span className="product-card__price product-card__price--original">
                          {product.price} <small>EUR</small>
                        </span>
                        <span className="product-card__price product-card__price--sale">
                          {discountedPrice} <small>EUR</small>
                        </span>
                      </>
                    ) : (
                      <span className="product-card__price">
                        {product.price} <small>EUR</small>
                      </span>
                    )}
                  </div>
                  <StarRating rating={product.rating} />
                </div>

                <button
                  className={`home-product-card__fav-btn${isFav ? " active" : ""}`}
                  onClick={(e) => { e.preventDefault(); toggleFavorites(product); }}
                >
                  <img
                    src={isFav ? "/icons/FavoritesFilled.png" : "/icons/Favorites.png"}
                    alt="Favorite"
                  />
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="products-back">
        <Link to="/" className="auth-btn-secondary">BACK TO HOME ›</Link>
      </div>
    </div>
  );
}

export default ProductListPage;

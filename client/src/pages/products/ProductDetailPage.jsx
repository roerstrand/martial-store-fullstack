import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Pages.css";
import useFetch from "../../hooks/useFetch.jsx";
import { getProduct } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { REVIEWS } from "../../data/testimonials";
import PageNav from "../../components/PageNav";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import RecentlyViewed from "../../components/products/RecentlyViewed";

function Stars({ rating }) {
  return (
    <span className="detail-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= rating ? "star star--filled" : "star"}>{'★'}</span>
      ))}
    </span>
  );
}

function ProductDetailPage() {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [, addToCart] = useCart();
  const navigate = useNavigate();
  const { items: recentItems, addProduct } = useRecentlyViewed();

  const { data: product, loading, error } = useFetch(() => getProduct(productId));

  useEffect(() => {
    if (product?._id) addProduct(product);
  }, [product?._id]);

  if (loading) return <p className="loading">Loading product...</p>;
  if (error)   return <p className="loading">Something went wrong.</p>;
  if (!product || !product._id) return <p className="loading">Product not found.</p>;

  const reviews = REVIEWS[product.category] ?? [];

  const handleBuyNow = async () => {
    if (!selectedSize) return;
    await addToCart(product, selectedSize);
    navigate("/cart");
  };

  return (
    <div className="product-detail-page">
      <PageNav back="/products" backLabel="All Products" />
      <div className="product-detail__layout">
        <div className="product-detail__image">
          <img src={`/images/products/${product.image}`} alt={product.title} loading="lazy" />
        </div>

        <div className="product-detail__info">
          <p className="product-detail__name">{product.title}</p>

          <div className="product-detail__social-row">
            <Stars rating={product.rating} />
            <span className="product-detail__rating-num">
              {product.rating}.0
            </span>
            {product.sold > 0 && (
              <span className="product-detail__sold">{product.sold} sold</span>
            )}
          </div>

          <p className="product-detail__availability">AVAILABLE</p>
          <p className="product-detail__price">{product.price} EUR</p>
          <p className="product-detail__desc">{product.description}</p>

          <p className="product-detail__size-label">SIZE</p>
          <div className="product-detail__sizes">
            {["S", "M", "L"].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "size-btn--active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button className="product-detail__buy" onClick={handleBuyNow}>
            BUY NOW
          </button>

          {product.details && (
            <>
              <p className="product-detail__materials-title">MATERIALS / DETAILS</p>
              <p className="product-detail__materials-text">{product.details}</p>
            </>
          )}
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="product-reviews">
          <p className="product-reviews__title">Customer Reviews</p>
          <div className="product-reviews__list">
            {reviews.map((r, i) => (
              <div key={i} className="product-review">
                <div className="product-review__top">
                  <span className="product-review__author">{r.author}</span>
                  <Stars rating={r.rating} />
                  <span className="product-review__date">{r.date}</span>
                </div>
                <p className="product-review__text">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/" className="auth-btn-secondary" style={{ margin: "0 1.5rem 2rem" }}>
        BACK TO HOME ›
      </Link>

      <RecentlyViewed items={recentItems} currentId={productId} />
    </div>
  );
}

export default ProductDetailPage;

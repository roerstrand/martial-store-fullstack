import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Pages.css";
import useFetch from "../../hooks/useFetch.jsx";
import { getProduct } from "../../services/productService";
import { useCart } from "../../context/CartContext";

function ProductDetailPage() {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [, addToCart] = useCart();
  const nagivate = useNavigate();

  const {
    data: product,
    loading,
    error,
  } = useFetch(() => getProduct(productId));

  if (loading) return <p className="loading">Loading product...</p>;
  if (error) return <p className="loading">Something went wrong.</p>;
  if (!product || !product._id)
    return <p className="loading">Product not found.</p>;

  const handleBuyNow = async () => {
    if (!selectedSize) return;
    await addToCart(product, selectedSize);
    navigate("/cart");
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail__layout">
        <div className="product-detail__image">
          <img src={`/images/products/${product.image}`} alt={product.title} />
        </div>

        <div className="product-detail__info">
          <p className="product-detail__name">{product.title}</p>
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

          <p className="product-detail__materials-title">MATERIALS / DETAILS</p>
          <p className="product-detail__materials-text">{product.details}</p>
        </div>
      </div>
      <Link to="/" className="auth-btn-secondary">
        BACK TO HOME ›
      </Link>
    </div>
  );
}

export default ProductDetailPage;

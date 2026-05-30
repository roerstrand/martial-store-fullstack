import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getProducts } from "../../services/productService";
import "../Pages.css";

function ProductListPage() {
  const { data: products, loading, error } = useFetch(getProducts);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="loading">Could not load products</p>;

  return (
    <div className="products-page">
      <h1>Our Fight Gear</h1>
      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="product-card">
            <div className="product-card__img-wrap">
              <img src={`/images/products/${product.image}`} alt={product.title} />
              <button className="product-card__cart-btn" onClick={(e) => e.preventDefault()}>
                <img src="/icons/Cart add.svg" alt="Add to cart" />
              </button>
            </div>
            <span className="product-card__label">{product.title} {product.price}£</span>
          </Link>
        ))}
      </div>
      <Link to="/" className="auth-btn-secondary">BACK TO HOME ›</Link>
    </div>
  );
}

export default ProductListPage;

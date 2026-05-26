import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import "../Pages.css";

function ProductListPage() {
  const { data: products, loading, error } = useFetch(getProducts);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Could not load products</p>;

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((product) => {
          return (
            <div key={product._id} className="product-card">
              <img src={`/images/products/${product.image}`} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: {product.price} €</p>
              <Link to={`/products/${product._id}`} className="btn-small">
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListPage;

import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { getProducts } from "../.../services/productService";
import "../Pages.css";

function ProductList() {
  const { data: products, loading, error } = useFetch(getProducts);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Could not load products</p>;

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((product) => {
          <div key={product._id} className="product-card">
            <h3>{pruduct.name}</h3>
            <p>Price: {product.price} €</p>
            <Link to={`/products/${product.id}`} className="btn-small">
              View Details
            </Link>
          </div>;
        })}
      </div>
    </div>
  );
}

export default ProductList;

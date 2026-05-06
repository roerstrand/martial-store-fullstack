import React from "react";
import { Link } from "react-router-dom";

function ProductPage({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      <Link to={`/features/products/product/${product.id}`}>More details</Link>
    </div>
  );
}

export default ProductPage;
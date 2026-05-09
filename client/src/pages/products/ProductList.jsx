import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import "../Pages.css";

/**
 * Products.js - Produktlistsidan
 *
 * Denna komponent:
 * 1. Hämtar produkter från ett API när komponenten laddar (useEffect)
 * 2. Visar en loading-state medan data hämtas
 * 3. Visar en lista av produkter i ett grid-format
 * 4. Länkar till detaljsidan för varje produkt med produktens ID
 */

function Products() {
  const url = "";
  const { data: products, loading, error } = useFetch(url);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>Price: {product.price} £</p>

            {/* Länka till denna specifika produkts detaljesida */}
            <Link to={`/products/${product.id}`} className="btn-small">
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

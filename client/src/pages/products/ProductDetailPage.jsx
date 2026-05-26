import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../Pages.css";
import useFetch from "../../hooks/useFetch.jsx";
import { getProduct } from "../../services/productService";

/**
 * ProductDetail.js - Produktdetaljer-sidan
 *
 * Denna komponent använder DYNAMISK ROUTING med URL-parametrar
 *
 * Exempel URL: /products/1
 * Här är "1" en parameter som vi kan läsa med useParams()
 *
 * Flödet:
 * 1. useParams() läser produktens ID från URL:en
 * 2. useEffect() hämtar denna specifika produkts data från API:t
 * 3. Vi visar produkten när den är laddad
 */

function ProductDetailPage() {
  // useParams() läser parametrarna från URL:en
  // I App.js skapade vi roueten: path="/products/:productId"
  // Så productId är namnet på vår parameter
  const { productId } = useParams(); // Läs productId från URL
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    loading,
    error,
  } = useFetch(() => getProduct(productId));

  //Bryr sig inte om HUR data hämtas
  //Bryr sig bara om => har jag data? => laddar det? => Gick det fel?

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!product || !product._id) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.title} to your cart!`);
    setQuantity(1); // Återställ kvantitet
  };

  return (
    <div className="product-detail card">
      <Link to="/products">&larr; Back to products</Link>
      <img src={`/images/products/${product.image}`} alt={product.title} />

      <h1>{product.title}</h1>
      <p className="price">{product.price} £</p>
      <p className="description">{product.description}</p>
      <p className="rating">Rating: {product.rating} ⭐</p>

      <div className="purchase-section">
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleAddToCart} className="btn">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;

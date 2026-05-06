import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Pages.css";
import useFetch from "./hooks/useFetch.jsx";

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

function ProductDetail() {
  // useParams() läser parametrarna från URL:en
  // I App.js skapade vi roueten: path="/products/:productId"
  // Så productId är namnet på vår parameter
  const { productId } = useParams(); // Läs productId från URL
  

  const url = "https://dummyjson.com/products/${productId}";

  const { data, loading, error } = useFetch(url);

//Bryr sig inte om HUR data hämtas
//Bryr sig bara om => har jag data? => laddar det? => Gick det fel?

  if (loading) {
    return <p>Laddar produktdetaljer...</p>;
  }

  if (!product || !product.id) {
    return <p>Produkten hittades inte.</p>;
  }

  if (error) {
    return <p>Något gick fel...</p>;
  }

  const handleAddToCart = () => {
    alert(`Du la till ${quantity} st ${product.title} i kundvagnen!`);
    setQuantity(1); // Återställ kvantitet
  };

  return (
    <div className="product-detail">
      <Link to="/products">&larr; Tillbaka till produkter</Link>

      <h1>{product.title}</h1>
      <p className="price">{product.price} kr</p>
      <p className="description">{product.description}</p>
      <p className="rating">Betyg: {product.rating} ⭐</p>

      <div className="purchase-section">
        <label>
          Kvantitet:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleAddToCart} className="btn">
          Lägg i kundvagn
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;

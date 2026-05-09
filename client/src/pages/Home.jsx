import React, { useState, useEffect } from "react";
import Section from "./Section";
import "./Pages.css";

function Home() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch("/HomePageProducts")
      .then((response) => response.json())
      .then((data) => {
        setSections(data);
        console.log(data);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  if (!sections || !Array.isArray(sections)) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="home-page container-text-center py-5">
        {products.map((product) => (
          <ProductDetails key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Home;

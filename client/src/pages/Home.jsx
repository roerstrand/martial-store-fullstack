import React, { useState, useEffect } from "react";
import Section from "./Section";

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
      <h1>Welcome to Apex Core</h1>
      {products.map((product) => (
        <ProductDetails key={product.id} product={product} />
      ))}
    </>
  );
}
export default Home;

import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { getProducts } from "../services/productService";
import { useFavorites } from "../context/FavoriteContext";
import { articles } from "../data/articles";
import "./Pages.css";

const SLIDE_INTERVAL = 3500;
const VISIBLE = 4;

function HomePage() {
  const [toggleFavorites, favorites] = useFavorites();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  const sale = searchParams.get("sale");

  const { data: allProducts, loading } = useFetch(getProducts);

  const products = useMemo(() => {
    if (!allProducts) return [];
    if (category) return allProducts.filter((p) => p.category === category);
    if (sale) return allProducts.filter((p) => p.sale > 0);
    return allProducts;
  }, [allProducts, category, sale]);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState("idle"); // "idle" | "exit" | "enter"
  const intervalRef = useRef(null);

  // Preload all product images when fetched
  useEffect(() => {
    if (!allProducts) return;
    allProducts.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = `/images/products/${p.image}`;
      }
    });
  }, [allProducts]);

  // Reset on filter change
  useEffect(() => {
    setDisplayIndex(0);
    setPhase("idle");
  }, [category, sale]);

  // Auto-advance
  const startSlide = () => {
    clearInterval(intervalRef.current);
    if (products.length <= VISIBLE) return;
    intervalRef.current = setInterval(() => {
      setPhase("exit");
      setTimeout(() => {
        setDisplayIndex((prev) => (prev + 1) % products.length);
        setPhase("enter");
        setTimeout(() => setPhase("idle"), 400);
      }, 280);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    startSlide();
    return () => clearInterval(intervalRef.current);
  }, [products.length]);

  const visibleProducts = products.length > 0
    ? Array.from({ length: Math.min(VISIBLE, products.length) }, (_, i) =>
        products[(displayIndex + i) % products.length]
      )
    : [];

  return (
    <div className="home-page">
      <section className="home-products">
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <button
            className="home-products__arrow home-products__arrow--left"
            onClick={() => { setDisplayIndex((prev) => (prev - 1 + products.length) % products.length); startSlide(); }}
            disabled={products.length <= VISIBLE}
          >‹</button>

          <div className="home-slideshow-wrapper" style={{ flex: 1 }}>
            <div className={`home-products__grid home-products__grid--${phase}`}>
              {loading && (
                <p className="loading" style={{ gridColumn: "1/-1" }}>Loading...</p>
              )}
              {visibleProducts.map((product, i) => (
                <Link
                  to={`/products/${product._id}`}
                  key={`${product._id}-${displayIndex}-${i}`}
                  className="home-product-card"
                >
                  <div className="home-product-card__img-wrap">
                    <img src={`/images/products/${product.image}`} alt={product.title} />
                    {product.sale > 0 && (
                      <span className="home-product-card__sale">-{product.sale}%</span>
                    )}
                  </div>
                  <div className="home-product-card__footer">
                    <span className="home-product-card__label">
                      {product.title} {product.price}€
                    </span>
                    <div className="home-product-card__actions">
                      <button
                        className={`home-product-card__fav-btn${favorites.some(f => f._id === product._id) ? " active" : ""}`}
                        onClick={(e) => { e.preventDefault(); toggleFavorites(product); }}
                      >
                        <img
                          src={favorites.some(f => f._id === product._id) ? "/icons/FavoritesFilled.png" : "/icons/Favorites.png"}
                          alt="Favorite"
                        />
                      </button>
                      <span className="home-product-card__cart">
                        <img src="/icons/Cart.svg" alt="Add to cart" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button
            className="home-products__arrow home-products__arrow--right"
            onClick={() => { setDisplayIndex((prev) => (prev + 1) % products.length); startSlide(); }}
            disabled={products.length <= VISIBLE}
          >›</button>
        </div>

        {products.length > VISIBLE && (
          <div className="home-products__dots">
            {products.map((_, i) => (
              <button
                key={i}
                className={`home-products__dot ${i === displayIndex ? "home-products__dot--active" : ""}`}
                onClick={() => { setDisplayIndex(i); startSlide(); }}
              />
            ))}
          </div>
        )}

        {(category || sale) && (
          <button className="home-products__clear" onClick={() => navigate("/")}>
            ✕ Clear filter
          </button>
        )}
      </section>

      <section className="home-articles">
        <div className="home-articles__header">
          <span>Stories below</span>
          <Link to="/articles" className="home-articles__btn">›</Link>
        </div>
        <div className="home-articles__grid">
          {articles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`} className="home-article-card">
              <div className="home-article-card__text">
                <p className="home-article-card__title">{article.title}</p>
                <p className="home-article-card__author">by {article.author}</p>
              </div>
              <img src={article.img} alt={article.title} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

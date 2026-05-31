import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getProducts } from "../../services/productService";
import Filter, { DEFAULT_FILTERS } from "../../components/products/Filter";
import "../Pages.css";

const CATEGORIES = ["all", "bjj", "boxing", "muaythai", "karate"];

function applyFilters(products, category, filters) {
  let result = category === "all"
    ? [...products]
    : products.filter((p) => p.category === category);

  if (filters.onSale)        result = result.filter((p) => p.sale > 0);
  if (filters.minPrice !== "") result = result.filter((p) => p.price >= Number(filters.minPrice));
  if (filters.maxPrice !== "") result = result.filter((p) => p.price <= Number(filters.maxPrice));
  if (filters.minRating > 0) result = result.filter((p) => p.rating >= filters.minRating);

  if (filters.sort === "price-asc")   result.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc")  result.sort((a, b) => b.price - a.price);
  if (filters.sort === "name-asc")    result.sort((a, b) => a.title.localeCompare(b.title));
  if (filters.sort === "rating-desc") result.sort((a, b) => b.rating - a.rating);

  return result;
}

function ProductListPage() {
  const { data: products, loading, error } = useFetch(getProducts);
  const [category, setCategory]         = useState("all");
  const [showCategories, setShowCategories] = useState(false);
  const [showFilter, setShowFilter]     = useState(false);
  const [filters, setFilters]           = useState(DEFAULT_FILTERS);
  const gridRef = useRef(null);

  const scroll = (dir) => {
    gridRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (error)   return <p className="loading">Could not load products</p>;

  const displayed = applyFilters(products, category, filters);

  return (
    <div className="products-page">

      <div className="products-toolbar">
        <div className="products-toolbar__left">
          <button
            className="products-toolbar-btn"
            onClick={() => setShowCategories((prev) => !prev)}
          >
            CATEGORIES ›
          </button>
          {showCategories && (
            <div className="products-dropdown">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`products-dropdown__item${category === cat ? " products-dropdown__item--active" : ""}`}
                  onClick={() => { setCategory(cat); setShowCategories(false); }}
                >
                  {cat === "all" ? "All" : cat.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        <h1>Our Fight Gear</h1>

        <button
          className="products-toolbar-btn"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTER ›
        </button>
      </div>

      {showFilter && (
        <Filter
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className="products-scroll-wrapper">
        <button className="products-arrow" onClick={() => scroll(-1)}>‹</button>
        <div className="products-grid" ref={gridRef}>
          {displayed.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="product-card">
              <div className="product-card__img-wrap">
                <img src={`/images/products/${product.image}`} alt={product.title} />
                <button className="product-card__cart-btn" onClick={(e) => e.preventDefault()}>
                  <img src="/icons/Cart add.svg" alt="Add to cart" />
                </button>
              </div>
              <span className="product-card__label">{product.title} {product.price} EUR</span>
            </Link>
          ))}
        </div>
        <button className="products-arrow" onClick={() => scroll(1)}>›</button>
      </div>

      <Link to="/" className="auth-btn-secondary">BACK TO HOME ›</Link>
    </div>
  );
}

export default ProductListPage;

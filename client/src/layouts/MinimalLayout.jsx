import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation, useMatch } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const CATEGORIES = [
  { value: "bjj",      label: "BJJ" },
  { value: "boxing",   label: "Boxing" },
  { value: "muaythai", label: "Muay Thai" },
  { value: "karate",   label: "Karate" },
];

function MinimalLayout() {
  const [cart] = useCart();
  const [, favorites] = useFavorites();
  const [user, , , logout] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;
  const [catOpen, setCatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const catRef = useRef(null);

  const saleActive  = new URLSearchParams(location.search).get("sale") === "true";
  const onCartPage  = !!useMatch("/cart");
  const onCheckout  = !!useMatch("/checkout");

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="app">
      <header className="ml-header">
        <div className="ml-header__top">
          <Link to="/" className="ml-header__brand">
            <img src="/images/logo.png" alt="Apex Core" className="ml-header__logo" />
            <span className="ml-header__brand-name">APEX CORE</span>
          </Link>

          <nav className="ml-header__nav">
            <Link to="/products" className="ml-nav-link">All Products</Link>
            <button
              className={`ml-nav-link ml-nav-link--sale${saleActive ? " ml-nav-link--active" : ""}`}
              onClick={() => navigate(saleActive ? "/" : "/?sale=true")}
            >
              Sale
            </button>
            <div ref={catRef} style={{ position: "relative" }}>
              <button
                className={`ml-nav-link${catOpen ? " ml-nav-link--active" : ""}`}
                onClick={() => setCatOpen((o) => !o)}
              >
                Categories <span className="ml-nav-chevron">{catOpen ? "▴" : "▾"}</span>
              </button>
              {catOpen && (
                <div className="ml-cat-dropdown">
                  <button className="ml-cat-option" onClick={() => { setCatOpen(false); navigate("/"); }}>All disciplines</button>
                  <div className="ml-cat-divider" />
                  {CATEGORIES.map((c) => (
                    <button key={c.value} className="ml-cat-option" onClick={() => { setCatOpen(false); navigate(`/?category=${c.value}`); }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link to="/articles" className="ml-nav-link">Stories</Link>
          </nav>

          <div className="ml-header__right">
            <Link to="/favorites" className="ml-icon">
              <img src="/icons/Favorites.png" alt="Favorites" />
              {favCount > 0 && <span className="ml-icon__badge">{favCount}</span>}
            </Link>
            <Link to="/cart" className="ml-icon">
              <img src="/icons/Cart.svg" alt="Cart" />
              {cartCount > 0 && <span className="ml-icon__badge">{cartCount}</span>}
            </Link>
            {user ? (
              <>
                <Link to="/my-pages" className="ml-auth-link">My Pages</Link>
                <button onClick={handleLogout} className="ml-auth-btn">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="ml-auth-link">Log in</Link>
                <Link to="/register" className="ml-auth-btn">Sign up</Link>
              </>
            )}
            <button className="ml-burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="ml-mobile-nav">
            <Link to="/products" className="ml-mobile-link" onClick={() => setMenuOpen(false)}>All Products</Link>
            <button className="ml-mobile-link ml-nav-link--sale" onClick={() => { navigate("/?sale=true"); setMenuOpen(false); }}>Sale</button>
            {CATEGORIES.map((c) => (
              <button key={c.value} className="ml-mobile-link" onClick={() => { navigate(`/?category=${c.value}`); setMenuOpen(false); }}>{c.label}</button>
            ))}
            <Link to="/articles" className="ml-mobile-link" onClick={() => setMenuOpen(false)}>Stories</Link>
            <div className="ml-cat-divider" style={{ margin: "0.25rem 0" }} />
            {user ? (
              <>
                <Link to="/my-pages" className="ml-mobile-link" onClick={() => setMenuOpen(false)}>My Pages</Link>
                <button className="ml-mobile-link" onClick={() => { handleLogout(); setMenuOpen(false); }}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="ml-mobile-link" onClick={() => setMenuOpen(false)}>Log in</Link>
                <Link to="/register" className="ml-mobile-link" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </nav>
        )}
      </header>

      {cartCount > 0 && !onCartPage && !onCheckout && (
        <div className="ml-cart-bar">
          <span className="ml-cart-bar__text">{cartCount} {cartCount === 1 ? "item" : "items"} in cart</span>
          <Link to="/cart" className="ml-cart-bar__btn">View Cart ›</Link>
          <Link to="/checkout" className="ml-cart-bar__btn">Checkout ›</Link>
        </div>
      )}

      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MinimalLayout;

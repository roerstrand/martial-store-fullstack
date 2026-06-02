import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { value: "bjj",      label: "BJJ" },
  { value: "boxing",   label: "Boxing" },
  { value: "muaythai", label: "Muay Thai" },
  { value: "karate",   label: "Karate" },
];

function Navbar({ isOpen }) {
  const [user, , , logout] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const saleActive = new URLSearchParams(location.search).get("sale") === "true";
  const [catOpen, setCatOpen] = useState(false);
  const [loginNotice, setLoginNotice] = useState(false);
  const catRef = useRef(null);

  const handleMyPages = () => {
    if (!user) {
      setLoginNotice(true);
      setTimeout(() => setLoginNotice(false), 3000);
    } else {
      navigate("/my-pages");
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => { logout(); navigate("/login"); };
  const handleCategory = (value) => { setCatOpen(false); navigate(`/?category=${value}`); };

  return (
    <>
      {/* Desktop */}
      <nav className="apex-navbar">
        <div className="apex-navbar__left">
          <Link to="/products" className="apex-nav-btn">ALL PRODUCTS <span className="apex-nav-chevron">›</span></Link>
          <button
            className={`apex-nav-btn${saleActive ? " apex-nav-btn--active" : ""}`}
            onClick={() => navigate(saleActive ? "/" : "/?sale=true")}
          >SALE <span className="apex-nav-chevron">›</span></button>
          <div ref={catRef} style={{ position: "relative" }}>
            <button className="apex-nav-btn" onClick={() => setCatOpen((o) => !o)}>
              CATEGORIES <span className="apex-nav-chevron">{catOpen ? "▾" : "›"}</span>
            </button>
            {catOpen && (
              <div className="apex-cat-dropdown">
                <button className="apex-cat-option" onClick={() => { setCatOpen(false); navigate("/"); }}>All</button>
                {CATEGORIES.map((c) => (
                  <button key={c.value} className="apex-cat-option" onClick={() => handleCategory(c.value)}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="apex-navbar__right" style={{ position: "relative" }}>
          <Link to="/login"    className="apex-nav-btn">LOGIN    <span className="apex-nav-chevron">›</span></Link>
          <Link to="/register" className="apex-nav-btn">REGISTER <span className="apex-nav-chevron">›</span></Link>
          <button onClick={handleMyPages} className="apex-nav-btn">MY PAGES <span className="apex-nav-chevron">›</span></button>
          {user && (
            <button onClick={handleLogout} className="apex-nav-btn">LOGOUT</button>
          )}
          {loginNotice && (
            <div className="apex-login-notice">Please log in to view My Pages</div>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`apex-mobile-nav ${isOpen ? "open" : ""}`}>
        <Link to="/products" className="apex-nav-btn">ALL PRODUCTS</Link>
        <button
          className={`apex-nav-btn${saleActive ? " apex-nav-btn--active" : ""}`}
          onClick={() => navigate(saleActive ? "/" : "/?sale=true")}
        >SALE</button>
        {CATEGORIES.map((c) => (
          <button key={c.value} className="apex-nav-btn" onClick={() => handleCategory(c.value)}>{c.label}</button>
        ))}
        {user ? (
          <>
            <Link to="/my-pages" className="apex-nav-btn">MY PAGES</Link>
            <button onClick={handleLogout} className="apex-nav-btn">LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/login"    className="apex-nav-btn">LOGIN</Link>
            <Link to="/register" className="apex-nav-btn">REGISTER</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;

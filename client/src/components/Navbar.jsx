import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="apex-navbar">
      <div className="apex-navbar__items">
        <Link to="/products" className="apex-nav-btn">
          all Products <span className="apex-nav-chevron">›</span>
        </Link>
        <Link to="/sale" className="apex-nav-btn">
          sale <span className="apex-nav-chevron">›</span>
        </Link>
        <Link to="/categories" className="apex-nav-btn">
          Categories <span className="apex-nav-chevron">›</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
